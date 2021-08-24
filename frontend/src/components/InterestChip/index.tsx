import { Avatar, Chip } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import React from 'react';
import { Interest } from '../../utils/types';
import { UnselectedChip } from './InterestChip.styled';

export const InterestChip = ({
  interest,
  checked,
  onClick,
}: {
  interest: Interest;
  checked?: boolean;
  onClick?: () => void;
}): JSX.Element => {
  // TODO does the button look better with constant size (but empty space), or changing size?
  return checked ? (
    <Chip
      avatar={<Avatar>{interest.emoji}</Avatar>}
      label={interest.name}
      color="primary"
      clickable
      onClick={onClick}
      onDelete={onClick}
      deleteIcon={<DoneIcon />}
    />
  ) : (
    <UnselectedChip
      avatar={<Avatar>{interest.emoji}</Avatar>}
      label={interest.name}
      clickable
      onClick={onClick}
    />
  );
};
