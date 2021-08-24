import {
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import SaveIcon from '@material-ui/icons/Save';
import { default as React, useState } from 'react';
import { images } from '../../user-profiles';
import { colours } from '../../utils/colours';
import { Interest } from '../../utils/types';
import {
  CaptionTypography,
  PersonalisePaper,
  FlexGrid,
  UnselectedChip,
} from './PersonaliseModal.styled';

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

export const PersonaliseModal = ({
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
      <PersonalisePaper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Personalise</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <CaptionTypography>
              What are your interests and hobbies?
            </CaptionTypography>
          </Grid>

          <Grid item>
            <Grid
              container
              spacing={1}
              style={{ border: '1px solid #ccc', borderRadius: '1rem' }}
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

          <Grid item xs={12}>
            <CaptionTypography>Choose profile image</CaptionTypography>
          </Grid>
          <Grid item>
            <Grid
              container
              justifyContent="center"
              spacing={1}
              style={{
                border: '1px solid #ccc',
                borderRadius: '1rem',
                height: '20vh',
                overflow: 'scroll',
              }}
            >
              {images.map((image, index) => {
                return (
                  <Grid item key={index}>
                    <IconButton
                      style={{
                        backgroundColor:
                          image === selectedImage ? colours.primary : undefined,
                      }}
                      onClick={() => {
                        setSelectedImage(image);
                      }}
                    >
                      <img src={image} alt="" style={{ height: '2rem' }} />
                    </IconButton>
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
      </PersonalisePaper>
    </Modal>
  );
};