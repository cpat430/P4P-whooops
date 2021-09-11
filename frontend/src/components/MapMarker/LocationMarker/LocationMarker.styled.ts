import styled from 'styled-components';
import { colours } from '../../../utils/colours';

export const locationInnerColor = '#b01413';
export const locationOuterColor = '#ea4335';

export const LocationImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${locationInnerColor};
  color: ${colours.white};
`;
