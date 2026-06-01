import { apiClient } from "./client";

export interface AiChatRequest {
  message: string;
}

export interface AiChatResponse {
  context: Record<string, unknown>;
  reply: string;
}

export interface AiPredictRequest {
  features: Record<string, unknown>;
}

export interface AiPredictResponse {
  confidence: number;
  factors: string[];
  prediction: string;
}

export interface AiRecommendationItem {
  item_id: string;
  reason: string;
  score: number;
}

export function sendAiChat(payload: AiChatRequest): Promise<AiChatResponse> {
  return apiClient.post<AiChatResponse>("/ai/chat", payload);
}

export function predictAiRisk(
  payload: AiPredictRequest,
): Promise<AiPredictResponse> {
  return apiClient.post<AiPredictResponse>("/ai/predict", payload);
}

export function getAiRecommendations(
  userId: string,
): Promise<AiRecommendationItem[]> {
  return apiClient.get<AiRecommendationItem[]>("/ai/recommend", {
    user_id: userId,
  });
}
