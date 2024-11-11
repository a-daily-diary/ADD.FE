import type { User } from 'next-auth';

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

/* API */
export interface CreateMatchingFeedbackRequest extends MatchingFeedbackForm {
  matchingHistoryId: string;
  matchedUserId: string;
}

export interface CreateMatchingFeedbackResponse extends MatchingFeedbackForm {
  writer: Omit<User, 'accessToken'>;
  recipient: Omit<User, 'accessToken'>;
  matchingHistory: Omit<MatchingHistoryResponse, 'matchedUser'>;
}

export interface MatchingHistoryResponse {
  id: 'uuid';
  matchTime: 'number';
  matchedUser: Omit<User, 'accessToken'>;
  createdAt: 'date';
}
