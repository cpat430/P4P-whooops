import { Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';

export const ProfileDetailsContainer = styled(Paper)`
  &&& {
    background-color: rgba(211, 211, 211, 0.95);
    width: 50%;
    height: 60%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1%;
    overflow: scroll;
  }
`;

export const UserHeader = styled.div`
  height: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const UserAvatar = styled.img`
  height: 75%;
  border-radius: 50%;
`;

export const UserName = styled(Typography)`
  width: 100%;
  text-align: center;
  text-transform: capitalize;
`;

export const UserDescription = styled.p`
  text-wrap: wrap;
`;

export const UserText = styled(Typography)`
  padding-top: 1%;
`;

export const UserInterests = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
