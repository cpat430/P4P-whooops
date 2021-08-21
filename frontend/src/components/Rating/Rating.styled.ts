import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import { colours } from '../../utils/colours';

export const RatingContainer = styled.div``;

type RatingIconButtonProps = {
  $isSelected: boolean;
};

export const RatingIconButton = styled(IconButton)<RatingIconButtonProps>`
  &&& {
    color: black;
    ${(props) =>
      props.$isSelected && `background-color: ${colours.iconSelected}`};
  }
`;
