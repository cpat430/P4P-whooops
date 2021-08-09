import { Grid, Modal, Paper, Typography } from '@material-ui/core';
import React from 'react';

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
      <Paper style={{ height: '300px', width: '300px' }}>
        <Grid container style={{ height: '100%', width: '100%' }}>
          <Typography>{helperMessage}</Typography>
        </Grid>
      </Paper>
    </Modal>
  );
};
