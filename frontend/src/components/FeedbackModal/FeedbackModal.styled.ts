import { Divider, Paper, TextField } from '@material-ui/core';
import styled from 'styled-components';

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

export const FeedbackContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const FeedbackDivider = styled(Divider)`
  &&& {
    width: 100%;
    margin-bottom: 1rem;
    margin-top: 0.5rem;
  }
`;
