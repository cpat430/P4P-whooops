import { Button, Paper, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { colours } from '../../utils/colours';

export const FeedbackPaper = styled(Paper)`
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

export const FeedbackAnswerField = styled(TextField)`
  &&& {
    width: 100%;
  }
`;

export const SubmitButton = styled(Button)`
  &&& {
    background-color: ${(props) => (props.disabled ? 'grey' : colours.primary)};
    color: white;
  }
`;
