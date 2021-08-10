import { Button, Card, Grid, TextField, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { colours } from '../../utils/colours';

export const PageForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const PageTextField = styled(TextField)`
  height: 4rem;
`;

export const PageBackgroundGrid = styled(Grid)`
  &&& {
    background-color: ${colours.primary};
    height: 100vh;
  }
`;

export const RegisterTextField = styled(Typography)`
  &&& {
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

export const PageCard = styled(Card)`
  &&& {
    width: 90%;
    max-width: 20rem;
    height: 90%;
    max-height: 40rem;
    display: flex;
    padding: 10%;
  }
`;

export const SubmitButton = styled(Button)`
  &&& {
    background-color: ${colours.primary};
    color: white;
  }
`;
