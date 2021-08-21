import axios from 'axios';

type FeedbackProps = {
  id: string;
  email: string;
  question: string;
  rating: number;
  answer?: string;
};

export const createFeedback = async (
  props: FeedbackProps
): Promise<boolean> => {
  const { id, email, question, answer, rating } = props;

  try {
    await axios.post('/services/api/feedback', {
      id,
      email,
      question,
      rating,
      answer,
    });
  } catch (error) {
    console.error(error);
    return false;
  }

  return true;
};
