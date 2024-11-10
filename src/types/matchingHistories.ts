import type { User } from 'next-auth';

/* Response */
export interface MatchingHistory {
  id: 'uuid';
  matchTime: 'number';
  matchedUser: Omit<User, 'accessToken'>;
  createdAt: 'date';
}
