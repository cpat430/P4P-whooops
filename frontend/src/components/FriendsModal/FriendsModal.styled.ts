import { Paper, Tab, Tabs, Typography } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import styled from 'styled-components';
import { colours } from '../../utils/colours';

export const FriendsPaper = styled(Paper)`
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

export const FriendsModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FriendsModalHeader = styled.div`
  width: 100%;
`;

export const FriendsModalHeadingText = styled(Typography)``;

export const FriendsModalAppBar = styled.div`
  width: 100%;
`;

export const FriendsModalTabs = styled(Tabs)`
  .PrivateTabIndicator-colorSecondary-3 {
    background-color: ${colours.secondary};
  }
`;

export const FriendsModalTab = styled(Tab)``;

export const FriendsModalFilterIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const FriendsModalFilterIcon = styled(FilterListIcon)`
  float: right;
  border-radius: 50%;
  padding: 1%;
  :hover {
    background-color: ${colours.secondary};
  }
`;

export const FriendsModalUsersContainer = styled.div`
  // display: flex;
  justify-content: center;
  overflow-y: scroll;
  max-height: 60vh;
`;

export const FriendsModalUserPill = styled.div`
  width: 80%;
  height: 4rem;
  border-radius: 4rem;
  padding: 0.1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0.05rem solid black;
  box-shadow: 0.1rem 0.1rem ${colours.shadow};
  margin-bottom: 1rem;

  :hover {
    background-color: ${colours.shadow};
  }
`;

export const FriendsContainer = styled.div``;
