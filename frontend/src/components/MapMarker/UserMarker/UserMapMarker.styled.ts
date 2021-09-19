import { Avatar, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { circleRadius, triangleHeight } from '../MapMarker.styled';

const interestHeight = 0.6;
const interestPadding = 0.3;
const interestFontSize = 0.6;
const interestBackgroundColor = '#666';

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
