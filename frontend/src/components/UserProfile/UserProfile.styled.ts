import { Button, Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { colours } from '../../utils/colours';

export const ProfileDetailsPaper = styled(Paper)`
  &&& {
    width: 25rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const UserAvatar = styled.img`
  height: 8rem;
  border-radius: 50%;
  border: 2px solid black;
`;

export const UserNameTypography = styled(Typography)`
  text-align: center;
  text-transform: capitalize;
`;

export const UserFriendButton = styled(Button)`
  &&& {
    color: white;
    background-color: ${colours.primary};
  }
`;
