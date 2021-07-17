import { Paper } from '@material-ui/core';
import styled from 'styled-components';

export const ProfileDetailsContainer = styled(Paper)`
  &&& {
    background-color: red;
    width: 10rem;
    height: 10rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
