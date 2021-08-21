import React from 'react';
import { Button, Modal, Typography } from '@material-ui/core';
import { useState } from 'react';
import { Rating } from '../Rating';
import {
  FeedbackAnswerField,
  FeedbackContent,
  FeedbackDivider,
  FeedbackPaper,
} from './FeedbackModal.styled';

type FeedbackModalProps = {
  open: boolean;
  handleClose: () => void;
  question: string;
  onSubmit: (question: string, rating: number, answer?: string) => void;
};

export const FeedbackModal = (props: FeedbackModalProps): JSX.Element => {
  const { open, handleClose, question, onSubmit } = props;

  const [answer, setAnswer] = useState<string>('');
  const [rating, setRating] = useState<number>(-1);

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAnswer(event.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      disableAutoFocus
      disableEnforceFocus
      disableRestoreFocus
    >
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
            <Button onClick={() => onSubmit(question, rating, answer)}>
              Submit
            </Button>
          </FeedbackContent>
        </div>
      </FeedbackPaper>
    </Modal>
  );
};
