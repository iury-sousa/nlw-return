import { MailProvider } from '../providers/mailProvider';
import { FeedbacksRepository } from '../repositories/feedbacksRepository';

interface SubmitFeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {
  constructor(private feedbackRepository: FeedbacksRepository, private mailProvider: MailProvider) {}

  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = request;

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format!');
    }

    if (!type) {
      throw new Error('Type is required!');
    }

    if (!comment) {
      throw new Error('Comment is required!');
    }

    const feedback = await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailProvider.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px: color: #111">`,
        `<p>Tipo de feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" alt="icone de ${type}">` : '',
        `</div>`,
      ].join('\n'),
    });

    return feedback;
  }
}
