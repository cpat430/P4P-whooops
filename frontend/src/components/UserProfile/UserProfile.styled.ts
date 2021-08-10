import { IconButton, Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { colours } from '../../utils/colours';
import { FriendButton } from '../FriendButton';

export const ProfileDetailsPaper = styled(Paper)`
  &&& {
    width: 25rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #eee;
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

export const StyledFriendButton = styled(FriendButton)`
  &&& {
    background-color: ${(props) => (props.isFriend ? colours.primary : 'none')};
    color: ${(props) => (props.isFriend ? 'white' : colours.primary)};
    border-color: ${(props) => (props.isFriend ? 'white' : colours.primary)};
    :hover {
      background-color: ${(props) => (props.isFriend ? colours.error : 'none')};
    }
  }
`;

export const CloseIconButton = styled(IconButton)`
  &&& {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(40%, -40%);
    background-color: ${colours.error};
    color: white;
    padding: 5px;
  }
`;
