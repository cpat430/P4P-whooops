import { Grid, Tooltip } from '@material-ui/core';
import React from 'react';
import { RatingIconButton } from './Rating.styled';

type RatingProps = {
  value: number | null;
  allRatings: {
    value: number;
    text: string;
    icon: JSX.Element;
  }[];
  onChange: (rating: number) => void;
};

export const Rating = ({
  value,
  allRatings,
  onChange,
}: RatingProps): JSX.Element => {
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={1}>
      {allRatings.map((rating, i) => {
        return (
          <Grid item key={i}>
            <Tooltip title={rating.text}>
              <RatingIconButton
                $isSelected={value === rating.value}
                onClick={() => onChange(rating.value)}
              >
                {rating.icon}
              </RatingIconButton>
            </Tooltip>
          </Grid>
        );
      })}
    </Grid>
  );
};
