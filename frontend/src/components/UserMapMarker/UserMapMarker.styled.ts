import { Avatar, IconButton, Typography } from '@material-ui/core';
import styled from 'styled-components';

// Constants that can change the style of the marker
const triangleWidth = 30;
const triangleHeight = 30;
const triangleColor = '#555';

const circleRadius = 20; // 15
const circlePadding = 7;
const circleColor = '#555';

const interestCircleRadius = 10;
const interestCircleBackgroundColor = '#666';
const interestCirclePadding = 5;
const interestCircleFontSize = 10;

export const TriangleDiv = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 0px;
  left: 0px;
  height: 0px;
  width: 0px;
  border-top: ${triangleHeight}px solid ${triangleColor};
  border-bottom: ${triangleHeight}px solid transparent;

  border-left: ${triangleWidth / 2}px solid transparent;
  border-right: ${triangleWidth / 2}px solid transparent;
`;

export const ImageIconButton = styled(IconButton)`
  &&& {
    position: absolute;
    transform: translate(-50%, -50%);
    top: ${-triangleHeight}px;
    left: 0px;
    height: ${circleRadius * 2}px;
    width: ${circleRadius * 2}px;
    background-color: ${circleColor};
    padding: ${circlePadding}px;
  }
`;

export const ImageAvatar = styled(Avatar)`
  &&& {
    width: 100%;
    height: 100%;
  }
`;

export const InterestAvatar = styled(Avatar)`
  &&& {
    position: absolute;
    transform: translate(-50%, -50%);
    top: ${-triangleHeight + circleRadius * Math.sin(Math.PI / 4)}px;
    left: ${circleRadius * Math.sin(Math.PI / 4)}px;
    height: ${interestCircleRadius * 2 - interestCirclePadding * 2}px;
    width: ${interestCircleRadius * 2 - interestCirclePadding * 2}px;
    background-color: ${interestCircleBackgroundColor};
    padding: ${interestCirclePadding}px;
  }
`;

export const InterestTypography = styled(Typography)`
  &&& {
    font-size: ${interestCircleFontSize}px;
  }
`;
