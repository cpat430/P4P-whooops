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
      <Paper
        style={{
          width: '300px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ width: '100%', padding: '10%' }}
        >
          <Grid item xs={12}>
            <Typography variant="h6">Current Task</Typography>
            <Typography>{helperMessage}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};
