import { Grid, Modal, Typography } from '@material-ui/core';
import React from 'react';
import {
  ChallengeHelperGrid, ChallengeHelperPaper
} from './ChallengeHelperModal.styled';

type ChallengeHelperModalProps = {
  open: boolean;
  handleClose: () => void;
  helperMessage: string;
};

export const ChallengeHelperModal = (
  props: ChallengeHelperModalProps
): JSX.Element => {
  const { open, handleClose, helperMessage } = props;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      disableAutoFocus
      disableEnforceFocus
      disableRestoreFocus
    >
      <ChallengeHelperPaper>
        <ChallengeHelperGrid
          container
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={12}>
            <Typography variant="h6">Current Task</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{helperMessage}</Typography>
          </Grid>
        </ChallengeHelperGrid>
      </ChallengeHelperPaper>
    </Modal>
  );
};
