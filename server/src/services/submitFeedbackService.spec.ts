import { SubmitFeedbackService } from './submitFeedbackService';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackService = new SubmitFeedbackService(
  {
    create: createFeedbackSpy,
  },
  { sendMail: sendMailSpy }
);

describe('Submit feedbackl', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedbackService.execute({
        type: 'BUG',
        comment: 'Example comment',
        screenshot: 'data:image/png;base64test.jpg',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toBeCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(
      submitFeedbackService.execute({
        type: '',
        comment: 'Example comment',
        screenshot: 'data:image/png;base64test.jpg',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(
      submitFeedbackService.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64test.jpg',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback with invalid screenshot', async () => {
    await expect(
      submitFeedbackService.execute({
        type: 'BUG',
        comment: 'Example comment',
        screenshot: 'test.jpg',
      })
    ).rejects.toThrow();
  });
});
