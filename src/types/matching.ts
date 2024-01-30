interface FeedbackType {
  isNice: boolean;
  isFluent: boolean;
  isFunny: boolean;
  isBad: boolean;
}

export interface MatchingFeedbackForm {
  feedbackType: FeedbackType;
  feedbackMessage: string;
  neverMatchingAgain: boolean;
}
