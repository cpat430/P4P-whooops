import { Avatar, IconButton, Typography } from '@material-ui/core';
import styled from 'styled-components';

// Constants that change the style of the marker. All units are in rem
const triangleWidth = 2.5;
const triangleHeight = 2.5;
const triangleColor = '#555';

const circleRadius = 1.8;
const circlePadding = 0.5;
const circleColor = '#555';

const interestHeight = 0.6;
const interestBackgroundColor = '#666';
const interestPadding = 0.3;
const interestFontSize = 0.5;

export const TriangleDiv = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  border-top: ${triangleHeight}rem solid ${triangleColor};
  border-bottom: ${triangleHeight}rem solid transparent;

  border-left: ${triangleWidth / 2}rem solid transparent;
  border-right: ${triangleWidth / 2}rem solid transparent;
`;

export const ImageIconButton = styled(IconButton)`
  &&& {
    position: absolute;
    transform: translate(-50%, -50%);
    top: ${-triangleHeight}rem;
    left: 0;
    height: ${circleRadius * 2}rem;
    width: ${circleRadius * 2}rem;
    background-color: ${circleColor};
    padding: ${circlePadding}rem;
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
  }
`;

export const InterestTypography = styled(Typography)`
  &&& {
    position: absolute;
    transform: translate(-50%, -50%);
    top: ${-triangleHeight + circleRadius * Math.sin(Math.PI / 4)}rem;
    left: ${circleRadius * Math.sin(Math.PI / 4)}rem;
    height: ${interestHeight}rem;
    line-height: ${interestHeight}rem;
    width: fit-content;
    overflow: none;
    background-color: ${interestBackgroundColor};
    padding: ${interestPadding}rem;
    font-size: ${interestFontSize}rem;
    border-radius: 9999rem;
    color: white;
  }
`;
