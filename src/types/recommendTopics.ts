export interface RecommendTopic {
  id: string;
  createdAt: string;
  updatedAt: string;
  topicEn: string;
  topicKr: string;
  phraseEn: string;
  phraseKr: string;
}

export type GetRandomRecommendTopicResponse = RecommendTopic;
