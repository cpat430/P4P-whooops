import { Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import RemoveIcon from '@material-ui/icons/Remove';
import React, { useContext, useState } from 'react';
import { AppEventContext } from '../../contexts/AppEventContext';

type FriendButtonProps = {
  className: string;
  isFriend: boolean;
  toggleIsFriend: () => void;
};
export const FriendButton = ({
  className,
  isFriend,
  toggleIsFriend,
}: FriendButtonProps): JSX.Element => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const { addAppEvent } = useContext(AppEventContext);

  const buttonText = isFriend
    ? isMouseOver
      ? 'unfriend'
      : 'friends'
    : 'add friend';

  const buttonEndIcon = isFriend ? (
    isMouseOver ? (
      <RemoveIcon />
    ) : (
      <CheckIcon />
    )
  ) : (
    <PersonAddIcon />
  );
  const buttonVariant = isFriend ? 'contained' : 'outlined';

  return (
    <Button
      className={className}
      fullWidth
      onClick={() => {
        toggleIsFriend();
        addAppEvent({ name: 'click-add-friend-button' }); // TODO
      }}
      onMouseOver={() => {
        setIsMouseOver(true);
      }}
      onMouseOut={() => {
        setIsMouseOver(false);
      }}
      endIcon={buttonEndIcon}
      variant={buttonVariant}
    >
      {buttonText}
    </Button>
  );
};
