import { Fab } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import React, { useContext, useEffect, useState } from 'react';
import { ChallengeContext } from '../../contexts/ChallengeContext';

type ChallengeButtonProps = {
  className: string;
  onClick: () => void;
};
export const ChallengeButton = ({
  className,
  onClick,
}: ChallengeButtonProps): JSX.Element => {
  const [clicked, setClicked] = useState(false);
  const { challenge } = useContext(ChallengeContext);

  useEffect(() => {
    setClicked(false);
  }, [challenge]);

  return (
    <Fab
      className={className}
      onClick={() => {
        setClicked(true);
        onClick();
      }}
    >
      {clicked ? <AssignmentIcon /> : <AssignmentLateIcon />}
    </Fab>
  );
};
