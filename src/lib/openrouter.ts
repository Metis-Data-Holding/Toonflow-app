import axios from "axios";

export type OpenRouterModelRecord = {
  id?: string;
  name?: string;
  output_modalities?: string[];
};

export type OpenRouterModelOption = {
  label: string;
  value: string;
};

export function normalizeOpenRouterBaseURL(baseURL?: string): string {
  const fallback = "https://openrouter.ai/api/v1";
  const raw = (baseURL ?? fallback).trim();
  if (!raw) return fallback;
  const noSlash = raw.replace(/\/+$/, "");
  if (/\/api\/v1$/i.test(noSlash) || /\/v1$/i.test(noSlash)) return noSlash;
  return `${noSlash}/api/v1`;
}

export function normalizeOpenRouterApiKey(apiKey: string): string {
  return apiKey.replace(/^Bearer\s+/i, "").trim();
}

export async function fetchOpenRouterModels(params: {
  apiKey: string;
  baseURL?: string;
  outputModalities: string[];
}) {
  const { apiKey, baseURL, outputModalities } = params;
  const normalizedBaseURL = normalizeOpenRouterBaseURL(baseURL);
  const token = normalizeOpenRouterApiKey(apiKey);

  const { data } = await axios.get(`${normalizedBaseURL}/models`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      output_modalities: outputModalities.join(","),
    },
    timeout: 15000,
  });

  return Array.isArray(data?.data) ? (data.data as OpenRouterModelRecord[]) : [];
}

export function toOpenRouterModelOptions(models: OpenRouterModelRecord[]): OpenRouterModelOption[] {
  const modelCache = new Set<string>();
  return models
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
}
