import express from "express";
import { z } from "zod";
import { validateFields } from "@/middleware/middleware";
import { success, error } from "@/lib/responseFormat";
import u from "@/utils";
import { fetchOpenRouterModels, toOpenRouterModelOptions } from "@/lib/openrouter";

const router = express.Router();

export default router.post(
  "/",
  validateFields({
    apiKey: z.string().min(1),
    baseURL: z.string().optional(),
  }),
  async (req, res) => {
    const { apiKey, baseURL } = req.body;

    try {
      const models = await fetchOpenRouterModels({
        apiKey,
        baseURL,
        outputModalities: ["text"],
      });
      const list = toOpenRouterModelOptions(models);

      if (!list.length) {
        return res.status(400).send(error("未获取到可用模型，请检查 API Key 或 baseURL"));
      }

      return res.status(200).send(success({ openrouter: list }));
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        return res.status(400).send(error("OpenRouter 鉴权失败，请检查 API Key"));
      }

      const msg = u.error(err).message || "获取 OpenRouter 文本模型列表失败";
      return res.status(500).send(error(msg));
    }
  },
);
