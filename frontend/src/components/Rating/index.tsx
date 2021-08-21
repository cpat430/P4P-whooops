import React from 'react';
import { RatingContainer, RatingIconButton } from './Rating.styled';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import { Tooltip } from '@material-ui/core';

type RatingProps = {
  rating: number;
  setRating: (rating: number) => void;
};

export const Rating = (props: RatingProps): JSX.Element => {
  const { rating, setRating } = props;

  const handleClick = (value: number) => {
    setRating(value);
  };

  return (
    <RatingContainer>
      <Tooltip title="Very Dissatisfied">
        <RatingIconButton
          $isSelected={rating === 1}
          onClick={() => handleClick(1)}
        >
          <SentimentVeryDissatisfiedIcon />
        </RatingIconButton>
      </Tooltip>
      <Tooltip title="Dissatisfied">
        <RatingIconButton
          $isSelected={rating === 2}
          onClick={() => handleClick(2)}
        >
          <SentimentDissatisfiedIcon />
        </RatingIconButton>
      </Tooltip>
      <Tooltip title="Okay">
        <RatingIconButton
          $isSelected={rating === 3}
          onClick={() => handleClick(3)}
        >
          <SentimentSatisfiedIcon />
        </RatingIconButton>
      </Tooltip>
      <Tooltip title="Satisfied">
        <RatingIconButton
          $isSelected={rating === 4}
          onClick={() => handleClick(4)}
        >
          <SentimentSatisfiedAltIcon />
        </RatingIconButton>
      </Tooltip>
      <Tooltip title="Very Satisfied">
        <RatingIconButton
          $isSelected={rating === 5}
          onClick={() => handleClick(5)}
        >
          <SentimentVerySatisfiedIcon />
        </RatingIconButton>
      </Tooltip>
    </RatingContainer>
  );
};
