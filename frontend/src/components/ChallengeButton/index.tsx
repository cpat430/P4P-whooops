import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import React, { useContext, useEffect, useState } from 'react';
import { ChallengeContext } from '../../contexts/ChallengeContext';
import { ChallengeFab } from './ChallengeButton.styled';

type ChallengeButtonProps = {
  onClick: () => void;
};
export const ChallengeButton = ({
  onClick,
}: ChallengeButtonProps): JSX.Element => {
  const [clicked, setClicked] = useState(false);
  const { challenge } = useContext(ChallengeContext);

  useEffect(() => {
    setClicked(false);
  }, [challenge]);

  return (
    <ChallengeFab
      $clicked={clicked}
      onClick={() => {
        setClicked(true);
        onClick();
      }}
    >
      {clicked ? <AssignmentIcon /> : <AssignmentLateIcon />}
    </ChallengeFab>
  );
};
