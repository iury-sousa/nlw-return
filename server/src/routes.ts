import express from 'express';
import { NodemailerProvider } from './providers/nodemailer/nodemailerProvider';
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { SubmitFeedbackService } from './services/submitFeedbackService';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerProvider = new NodemailerProvider();

  const submitFeedbackService = new SubmitFeedbackService(prismaFeedbacksRepository, nodemailerProvider);

  const feedback = await submitFeedbackService.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).json({ data: feedback });
});
