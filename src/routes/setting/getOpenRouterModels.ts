import express from "express";
import axios from "axios";
import { z } from "zod";
import { validateFields } from "@/middleware/middleware";
import { success, error } from "@/lib/responseFormat";
import u from "@/utils";

const router = express.Router();

function normalizeBaseURL(baseURL?: string): string {
  const fallback = "https://openrouter.ai/api/v1";
  const raw = (baseURL ?? fallback).trim();
  if (!raw) return fallback;
  const noSlash = raw.replace(/\/+$/, "");
  if (/\/api\/v1$/i.test(noSlash) || /\/v1$/i.test(noSlash)) return noSlash;
  return `${noSlash}/api/v1`;
}

type OpenRouterModel = {
  id?: string;
  name?: string;
};

export default router.post(
  "/",
  validateFields({
    apiKey: z.string().min(1),
    baseURL: z.string().optional(),
  }),
  async (req, res) => {
    const { apiKey, baseURL } = req.body;
    const normalizedBaseURL = normalizeBaseURL(baseURL);
    const token = apiKey.replace(/^Bearer\s+/i, "").trim();

    try {
      const { data } = await axios.get(`${normalizedBaseURL}/models`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 15000,
      });

      const models: OpenRouterModel[] = Array.isArray(data?.data) ? data.data : [];
      const modelCache = new Set<string>();
      const list = models
        .filter((model) => !!model?.id)
        .map((model) => ({
          label: model.name || model.id!,
          value: model.id!,
        }))
        .filter((item) => {
          if (modelCache.has(item.value)) return false;
          modelCache.add(item.value);
          return true;
        })
        .sort((a, b) => a.value.localeCompare(b.value));

      if (!list.length) {
        return res.status(400).send(error("未获取到可用模型，请检查 API Key 或 baseURL"));
      }

      return res.status(200).send(success({ openrouter: list }));
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        return res.status(400).send(error("openRouter 鉴权失败，请检查 API Key"));
      }

      const msg = u.error(err).message || "获取 openRouter 模型列表失败";
      return res.status(500).send(error(msg));
    }
  },
);