import { Fab } from '@material-ui/core';
import styled from 'styled-components';
import { ChallengeButton } from '../../components/ChallengeButton';

export const MapDiv = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const EditInterestFab = styled(Fab)`
  &&& {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
`;

export const FriendsFab = styled(Fab)`
  &&& {
    position: absolute;
    right: 6rem;
    bottom: 1rem;
  }
`;

export const StyledChallengeButton = styled(ChallengeButton)`
  &&& {
    position: absolute;
    right: 11rem;
    bottom: 1rem;
  }
`;
