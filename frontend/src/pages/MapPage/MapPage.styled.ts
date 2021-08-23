import { Fab } from '@material-ui/core';
import styled from 'styled-components';
import { ChallengeButton } from '../../components/ChallengeButton';
import { colours } from '../../utils/colours';

export const MapDiv = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const EditInterestFab = styled(Fab)`
  &&& {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: ${colours.primary};
    color: white;
  }
`;

export const FriendsFab = styled(Fab)`
  &&& {
    position: absolute;
    top: 6rem;
    right: 1rem;
    background-color: ${colours.primary};
    color: white;
  }
`;

export const StyledChallengeButton = styled(ChallengeButton)`
  &&& {
    position: absolute;
    top: 11rem;
    right: 1rem;
    background-color: ${colours.primary};
    color: white;
  }
`;

export const FeedbackFab = styled(Fab)`
  &&& {
    position: absolute;
    top: 16rem;
    right: 1rem;
    background-color: ${colours.primary};
    color: white;
  }
`;
