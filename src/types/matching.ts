interface FeedbackType {
  isNice: boolean;
  isFluent: boolean;
  isFun: boolean;
  isBad: boolean;
}

export interface MatchingFeedbackForm {
  feedbackType: FeedbackType;
  message: string;
  isBlockedMatching: boolean;
}

export interface MatchingSuccessResponse {
  role: 'offer' | 'answer';
  matchingSocket: string;
  matchingUser: string;
}
