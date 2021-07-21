import {
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  Modal,
  Typography,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import SaveIcon from '@material-ui/icons/Save';
import { default as React, useState } from 'react';
import { Interest } from '../../utils/types';
import {
  CaptionTypography,
  ChooseInterestPaper,
  FlexGrid,
  UnselectedChip,
} from './ChooseInterests.styled';

const InterestChip = ({
  interest,
  checked,
  onClick,
}: {
  interest: Interest;
  checked?: boolean;
  onClick?: () => void;
}) => {
  // TODO does the button look better with constant size (but empty space), or changing size?
  return checked ? (
    <Chip
      avatar={<Avatar>{interest.emoji}</Avatar>}
      label={interest.name}
      color="primary"
      clickable
      onClick={onClick}
      onDelete={onClick}
      deleteIcon={<DoneIcon />}
    />
  ) : (
    <UnselectedChip
      avatar={<Avatar>{interest.emoji}</Avatar>}
      label={interest.name}
      clickable
      onClick={onClick}
    />
  );
};

export const ChooseInterestsModal = ({
  open,
  handleClose,
  allInterests,
  value,
  onChange,
}: {
  open: boolean;
  handleClose: () => void;
  allInterests: Interest[];
  value: Interest[];
  onChange: (value: Interest[]) => void;
}): JSX.Element => {
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>(value);

  const handleSubmit = () => {
    onChange(selectedInterests);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      disableAutoFocus
      disableEnforceFocus
      disableRestoreFocus
    >
      <ChooseInterestPaper>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>Choose Interests</Typography>
          </Grid>
          <Grid item xs={12}>
            <CaptionTypography>
              What are your interests and hobbies?
            </CaptionTypography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              {allInterests.map((interest, index) => {
                const userInterestIndex = selectedInterests.findIndex(
                  (userInterest) => {
                    return userInterest.id === interest.id;
                  }
                );

                return (
                  <Grid item key={index}>
                    <InterestChip
                      interest={interest}
                      checked={userInterestIndex !== -1}
                      onClick={() => {
                        if (userInterestIndex === -1) {
                          setSelectedInterests(
                            selectedInterests.concat(interest)
                          );
                        } else {
                          setSelectedInterests(
                            selectedInterests.filter((userInterest, index) => {
                              return index !== userInterestIndex;
                            })
                          );
                        }
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <FlexGrid item />
          <Grid item>
            <Button
              variant="outlined"
              onClick={handleSubmit}
              color="primary"
              endIcon={<SaveIcon />}
            >
              save
            </Button>
          </Grid>
        </Grid>
      </ChooseInterestPaper>
    </Modal>
  );
};
