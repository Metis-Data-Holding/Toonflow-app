import "../type";
import axios from "axios";
import { normalizeOpenRouterApiKey, normalizeOpenRouterBaseURL } from "@/lib/openrouter";

type OpenRouterImageMessage = {
  images?: Array<{
    image_url?: { url?: string };
    imageUrl?: { url?: string };
  }>;
  content?: string;
};

const sizeMap: Record<ImageConfig["size"], "1K" | "2K" | "4K"> = {
  "1K": "1K",
  "2K": "2K",
  "4K": "4K",
};

const aspectRatioAllowList = new Set(["1:1", "2:3", "3:2", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9", "21:9", "1:4", "4:1", "1:8", "8:1"]);

function buildUserContent(input: ImageConfig) {
  const content: Array<{ type: "text"; text: string } | { type: "image_url"; image_url: { url: string } }> = [
    {
      type: "text",
      text: `${input.prompt}\n请直接输出图片。`,
    },
  ];

  for (const image of input.imageBase64 ?? []) {
    content.push({
      type: "image_url",
      image_url: {
        url: image,
      },
    });
  }

  return content;
}

function getImageUrl(message?: OpenRouterImageMessage): string | undefined {
  if (!message) return undefined;
  for (const image of message.images ?? []) {
    const url = image.image_url?.url || image.imageUrl?.url;
    if (url) return url;
  }

  if (typeof message.content === "string") {
    const markdownImage = message.content.match(/!\[.*?\]\((.+?)\)/);
    if (markdownImage?.[1]) return markdownImage[1];

    const dataUrl = message.content.match(/data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+/);
    if (dataUrl?.[0]) return dataUrl[0];
  }

  return undefined;
}

async function sendOpenRouterImageRequest(input: ImageConfig, config: AIConfig, modalities: string[]) {
  if (!config.model) throw new Error("缺少Model名称");
  if (!config.apiKey) throw new Error("缺少API Key");
  if (!input.prompt) throw new Error("缺少提示词");

  const token = normalizeOpenRouterApiKey(config.apiKey);
  const baseURL = normalizeOpenRouterBaseURL(config.baseURL);
  const imageConfig: Record<string, string> = {
    image_size: sizeMap[input.size] ?? "1K",
  };

  if (aspectRatioAllowList.has(input.aspectRatio)) {
    imageConfig.aspect_ratio = input.aspectRatio;
  }

  const messages: Array<{ role: "system" | "user"; content: any }> = [];
  if (input.systemPrompt?.trim()) {
    messages.push({
      role: "system",
      content: input.systemPrompt.trim(),
    });
  }
  messages.push({
    role: "user",
    content: buildUserContent(input),
  });

  const { data } = await axios.post(
    `${baseURL}/chat/completions`,
    {
      model: config.model,
      messages,
      modalities,
      image_config: imageConfig,
      stream: false,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      timeout: 60000,
    },
  );

  const message = data?.choices?.[0]?.message as OpenRouterImageMessage | undefined;
  const imageUrl = getImageUrl(message);
  if (imageUrl) return imageUrl;

  throw new Error("OpenRouter 未返回图片结果，请检查模型是否支持图像输出");
}

export default async (input: ImageConfig, config: AIConfig): Promise<string> => {
  try {
    return await sendOpenRouterImageRequest(input, config, ["image", "text"]);
  } catch (err: any) {
    const status = err?.response?.status;
    const message = err?.response?.data?.error?.message || err?.message || "";
    const shouldFallback = status === 400 && /modalities|image output|text output|unsupported/i.test(message);

    if (!shouldFallback) throw err;
  }

  return await sendOpenRouterImageRequest(input, config, ["image"]);
};
