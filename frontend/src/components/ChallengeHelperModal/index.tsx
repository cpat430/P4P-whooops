import { Modal } from '@material-ui/core';
import React from 'react';
import { ChallengeHelperPaper } from './ChallengeHelperModal.styled';

type ChallengeHelperModalProps = {
  open: boolean;
  handleClose: () => void;
  children?: JSX.Element;
};

export const ChallengeHelperModal = (
  props: ChallengeHelperModalProps
): JSX.Element => {
  const { open, handleClose, children } = props;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      disableAutoFocus
      disableEnforceFocus
      disableRestoreFocus
    >
      <ChallengeHelperPaper>{children}</ChallengeHelperPaper>
    </Modal>
  );
};
