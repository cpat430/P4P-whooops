import { Fab } from '@material-ui/core';
import styled from 'styled-components';

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
