import { Grid, IconButton, Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { colours } from '../../utils/colours';

export const PersonalisePaper = styled(Paper)`
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

export const CaptionTypography = styled(Typography)`
  &&& {
    font-weight: 500;
  }
`;

export const FlexGrid = styled(Grid)`
  &&& {
    flex: 1;
  }
`;

export const InterestGrid = styled(Grid)`
  &&& {
    border: 1px solid #ccc;
    border-radius: 1rem;
    height: 20vh;
    overflow: scroll;
  }
`;

export const ImagesGrid = styled(Grid)`
  &&& {
    border: 1px solid #ccc;
    border-radius: 1rem;
    height: 20vh;
    overflow: scroll;
  }
`;

export const ImageIconButton = styled(IconButton)<{ $selected: boolean }>`
  &&& {
    background-color: ${(props) =>
      props.$selected ? colours.primary : '#eee'};
  }
`;

export const UserImage = styled.img`
  height: 3rem;
`;
