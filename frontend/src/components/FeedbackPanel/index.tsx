import { Divider, Grid, Typography } from '@material-ui/core';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import React, { useContext, useState } from 'react';
import { AppEventContext } from '../../contexts/AppEventContext';
import { Rating } from '../Rating';
import {
  FeedbackAnswerField,
  FeedbackPaper,
  SubmitButton,
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
  const [ratingValue, setRatingValue] = useState<number | null>(null);

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAnswer(event.target.value);
  };

  return (
    <FeedbackPaper>
      <Grid container justifyContent="center" alignItems="center" spacing={1}>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography>{question}</Typography>
        </Grid>
        <Grid item>
          <Rating
            value={ratingValue}
            onChange={setRatingValue}
            allRatings={[
              {
                value: 1,
                text: 'Strongly Disagree',
                icon: <SentimentVeryDissatisfiedIcon />,
              },
              {
                value: 2,
                text: 'Disagree',
                icon: <SentimentDissatisfiedIcon />,
              },
              {
                value: 3,
                text: 'Neutral',
                icon: <SentimentSatisfiedIcon />,
              },
              {
                value: 4,

                text: 'Agree',
                icon: <SentimentSatisfiedAltIcon />,
              },
              {
                value: 5,
                text: 'Strongly Agree',
                icon: <SentimentVerySatisfiedIcon />,
              },
            ]}
          ></Rating>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography>{'Further comments?'}</Typography>
        </Grid>
        <Grid item xs={12}>
          <FeedbackAnswerField
            label="Your answer"
            multiline
            value={answer}
            variant="outlined"
            onChange={handleAnswerChange}
          ></FeedbackAnswerField>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <SubmitButton
            variant="contained"
            disabled={ratingValue === null}
            onClick={() => {
              if (ratingValue === null) return;

              addAppEvent({ name: 'submit-survey' });
              onSubmit(question, ratingValue, answer);
            }}
            fullWidth
          >
            Submit
          </SubmitButton>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
    </FeedbackPaper>
  );
};
