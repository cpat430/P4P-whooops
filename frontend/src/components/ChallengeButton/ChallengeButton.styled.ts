import { Fab } from '@material-ui/core';
import styled from 'styled-components';
import { colours } from '../../utils/colours';

type ChallengeButtonProps = {
  $clicked: boolean;
};

export const ChallengeFab = styled(Fab)<ChallengeButtonProps>`
  &&& {
    position: absolute;
    top: 11rem;
    right: 1rem;

    color: white;
    transform: scale(1);

    background-color: ${(props) =>
      props.$clicked ? colours.primary : colours.error};
    animation: ${(props) => (props.$clicked ? '' : 'pulse 2s infinite')};
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
`;
