import { Button, Fab, Paper, Tab, Tabs } from '@material-ui/core';
import styled from 'styled-components';
import { colours } from '../../utils/colours';

export const FriendsPaper = styled(Paper)`
  &&& {
    width: 30rem;
    max-width: 90%;
    border-radius: 0.3rem;

    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;

export const FriendsModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  overflow-y: scroll;
  height: 60vh;
`;

export const FriendsModalAppBar = styled.div`
  border-radius: 0.3rem 0.3rem 0 0;

  width: 100%;
  background-color: ${colours.primary};
`;

export const FriendsModalTabs = styled(Tabs)`
  color: white;
  .PrivateTabIndicator-colorSecondary-3 {
    background-color: ${colours.secondary};
  }
`;

export const FriendsModalTab = styled(Tab)`
  width: 50%;
`;

export const FriendsTuneFab = styled(Fab)`
  &&& {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    background-color: ${colours.primary};
    color: white;
    opacity: 1;
    z-index: 2;
  }
`;

export const FriendPillButton = styled(Button)`
  &&& {
    border: 1px solid grey;
    background-color: #dddddd;
    text-transform: none;
    margin-top: 1%;
  }
`;

export const FilterInterestPaper = styled(Paper)`
  &&& {
    width: 25rem;
    max-width: 90%;
    border-radius: 0.3rem;

    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;
