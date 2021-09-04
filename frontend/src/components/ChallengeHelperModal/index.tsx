import { Modal } from '@material-ui/core';
import React from 'react';
import { CloseIconButton } from '../UserProfile/UserProfile.styled';
import { ChallengeHelperPaper } from './ChallengeHelperModal.styled';
import CloseIcon from '@material-ui/icons/Close';

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
      <ChallengeHelperPaper>
        <CloseIconButton onClick={handleClose}>
          <CloseIcon />
        </CloseIconButton>
        {children}
      </ChallengeHelperPaper>
    </Modal>
  );
};
