import express from "express";
import u from "@/utils";
import { z } from "zod";
import { success } from "@/lib/responseFormat";
import { validateFields } from "@/middleware/middleware";
const router = express.Router();
const normalizeManufacturer = (manufacturer: string): string => {
  const input = manufacturer.trim();
  if (input.toLowerCase() === "openrouter") return "openrouter";
  return input;
};

export default router.post(
  "/",
  validateFields({
    id: z.number(),
    type: z.enum(["text", "video", "image"]),
    model: z.string(),
    baseUrl: z.string(),
    modelType: z.string(),
    apiKey: z.string(),
    manufacturer: z.string(),
  }),
  async (req, res) => {
    const { id, type, model, baseUrl, apiKey, manufacturer, modelType } = req.body;
    const normalizedManufacturer = normalizeManufacturer(manufacturer);

    await u.db("t_config").where("id", id).update({
      type,
      model,
      baseUrl,
      apiKey,
      manufacturer: normalizedManufacturer,
      modelType,
    });
    res.status(200).send(success("编辑成功"));
  },
);
