import { Grid, Paper } from '@material-ui/core';
import styled from 'styled-components';

export const ChallengeHelperPaper = styled(Paper)`
  &&& {
    width: 20rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 5%;
  }
`;

export const ChallengeHelperGrid = styled(Grid)`
  &&& {
    padding: 10%;
  }
`;
