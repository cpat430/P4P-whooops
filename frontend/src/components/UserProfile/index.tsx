import { Modal, Paper, Typography } from '@material-ui/core';
import React, { FC } from 'react';

type UserProfileProps = {
  isProfileOpen: boolean;
  toggleUserProfile: () => void;
};

export const UserProfile = ({
  isProfileOpen,
  toggleUserProfile,
}: UserProfileProps) => {
  return (
    <Modal
      open={isProfileOpen}
      disableAutoFocus
      disableEnforceFocus
      onClose={toggleUserProfile}
    >
      <Paper
        style={{
          width: '10rem',
          height: '10rem',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'red',
        }}
      >
        <Typography>hello</Typography>
      </Paper>
    </Modal>
  );
};
