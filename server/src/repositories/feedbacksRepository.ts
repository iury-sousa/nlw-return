import { Feedback } from '@prisma/client';

export interface FeedbackCreateData {
  id?: string;
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  create: (feedback: FeedbackCreateData) => Promise<Feedback>;
}
