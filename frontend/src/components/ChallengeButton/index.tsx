import { Fab } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import React, { useContext, useEffect, useState } from 'react';
import { ChallengeContext } from '../../contexts/ChallengeContext';

type ChallengeButtonProps = {
  onClick: () => void;
  style: CSSProperties;
};
export const ChallengeButton = ({
  onClick,
  style,
}: ChallengeButtonProps): JSX.Element => {
  const [clicked, setClicked] = useState(false);
  const { challenge } = useContext(ChallengeContext);

  useEffect(() => {
    setClicked(false);
  }, [challenge]);

  return (
    <Fab
      onClick={() => {
        setClicked(true);
        onClick();
      }}
      style={style}
    >
      {clicked ? <AssignmentIcon /> : <AssignmentLateIcon />}
    </Fab>
  );
};
