import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import { colours } from '../../utils/colours';
import { locationOuterColor } from './LocationMarker/LocationMarker.styled';

// Constants that change the style of the marker. All units are in rem
const triangleWidth = 2.5;
const triangleHeight = 2.5;
const triangleColor = '#555';

const circleRadius = 1.8;
const circlePadding = 0.5;
const circleColor = '#555';

const isUserCircleColor = colours.primary;

type UserProps = {
  $isUser?: boolean;
  $isLocation?: boolean;
};

export const TriangleDiv = styled.div<UserProps>`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  border-top: ${triangleHeight}rem solid
    ${(props) =>
      props.$isLocation
        ? locationOuterColor
        : props.$isUser
        ? isUserCircleColor
        : triangleColor};
  border-bottom: ${triangleHeight}rem solid transparent;

  border-left: ${triangleWidth / 2}rem solid transparent;
  border-right: ${triangleWidth / 2}rem solid transparent;
`;

export const ImageIconButton = styled(IconButton)<UserProps>`
  &&& {
    position: absolute;
    transform: translate(-50%, -50%);
    top: ${-triangleHeight}rem;
    left: 0;
    height: ${(props) =>
      props.$isLocation ? circleRadius * 1.4 : circleRadius * 2}rem;
    width: ${(props) =>
      props.$isLocation ? circleRadius * 1.4 : circleRadius * 2}rem;
    background-color: ${(props) =>
      props.$isLocation
        ? locationOuterColor
        : props.$isUser
        ? isUserCircleColor
        : circleColor};
    padding: ${circlePadding}rem;
  }
`;

export {
  triangleWidth,
  triangleHeight,
  triangleColor,
  circleRadius,
  circlePadding,
  circleColor,
};
