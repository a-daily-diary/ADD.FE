interface FeedbackType {
  isNice: boolean;
  isFluent: boolean;
  isFunny: boolean;
  isBad: boolean;
}

export interface MatchingFeedbackForm {
  feedbackType: FeedbackType;
  message: string;
  isBlockedMatching: boolean;
}
