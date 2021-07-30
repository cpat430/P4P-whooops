import { TextField, Typography } from '@material-ui/core';
import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const PageTitle = styled(Typography)``;

export const PageHeader = styled.div`
  display: flex;
  justify-content: center;
`;

export const PageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const PageFooter = styled.div`
  position: absolute;
  bottom: 0;
`;

export const PageForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PageTextField = styled(TextField)`
  padding-bottom: 2rem;
  height: 4rem;
`;
