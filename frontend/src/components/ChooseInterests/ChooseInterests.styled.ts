import { Chip, Grid, Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';

export const ChooseInterestPaper = styled(Paper)`
  &&& {
    width: 30rem;
    max-width: 90%;
    padding: 1.5rem;

    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;

export const UnselectedChip = styled(Chip)`
  &&& {
    background-color: #eee;
  }
`;

export const CaptionTypography = styled(Typography)`
  &&& {
    font-size: 0.8rem;
  }
`;

export const FlexGrid = styled(Grid)`
  &&& {
    flex: 1;
  }
`;
