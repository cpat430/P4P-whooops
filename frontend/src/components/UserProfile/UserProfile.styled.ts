import { Chip, Grid, IconButton, Paper, Typography } from '@material-ui/core';
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

const isFriendStyles = `
  background-color: ${colours.primary};
  color: white;
`;

const addFriendStyles = `
  background-color: none;
  color: ${colours.primary};
  border: 1px solid ${colours.primary};
`;

const unfriendStyles = `
  background-color: ${colours.error};
  color: white;
`;

export const StyledFriendButton = styled(FriendButton)`
  &&& {
    ${(props) => (props.isFriend ? isFriendStyles : addFriendStyles)}
    :hover {
      ${(props) => (props.isFriend ? unfriendStyles : '')}
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

export const CapitalisedChip = styled(Chip)`
  &&& {
    text-transform: capitalize;
  }
`;

export const ProfileGrid = styled(Grid)`
  &&& {
    padding: 5%;
  }
`;
