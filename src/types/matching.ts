interface FeedbackType {
  isNice: boolean;
  isFluent: boolean;
  isFun: boolean;
  isBad: boolean;
}

export interface MatchingFeedbackForm extends FeedbackType {
  content: string;
}

export interface MatchingInformation {
  role: 'offer' | 'answer';
  socketId: string;
  userId: string;
}

export interface PeerEventHandler {
  handleDisconnected: () => void;
}
