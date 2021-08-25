import { Button, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { AppEventContext } from '../../contexts/AppEventContext';
import { Rating } from '../Rating';
import {
  FeedbackAnswerField,
  FeedbackContent,
  FeedbackDivider,
  FeedbackPaper,
} from './FeedbackPanel.styled';

type FeedbackModalProps = {
  question: string;
  onSubmit: (question: string, rating: number, answer?: string) => void;
};

export const FeedbackPanel = ({
  question,
  onSubmit,
}: FeedbackModalProps): JSX.Element => {
  const { addAppEvent } = useContext(AppEventContext);
  const [answer, setAnswer] = useState<string>('');
  const [rating, setRating] = useState<number>(-1);

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAnswer(event.target.value);
  };

  return (
    <FeedbackPaper>
      <div>
        <div id="header"></div>
        <FeedbackContent>
          <Typography variant="h5">We would love your Feedback</Typography>
          <FeedbackDivider />
          <Typography>
            How would you rate your experience with the app?
          </Typography>
          <Rating rating={rating} setRating={setRating}></Rating>
          <FeedbackDivider />
          <Typography variant="subtitle2">{question}</Typography>
          <FeedbackAnswerField
            label="Your answer"
            multiline
            value={answer}
            onChange={handleAnswerChange}
          ></FeedbackAnswerField>
          <Button
            onClick={() => {
              addAppEvent({ name: 'submit-survey' });
              onSubmit(question, rating, answer);
            }}
          >
            Submit
          </Button>
        </FeedbackContent>
      </div>
    </FeedbackPaper>
  );
};
