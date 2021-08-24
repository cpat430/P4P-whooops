import {
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { default as React, useState } from 'react';
import { images } from '../../user-profiles';
import { colours } from '../../utils/colours';
import { Interest } from '../../utils/types';
import { InterestChip } from '../InterestChip';
import {
  CaptionTypography,
  FlexGrid,
  PersonalisePaper,
} from './PersonaliseModal.styled';

type InterestsAndImage = {
  interests: Interest[];
  image: string;
};

export const PersonaliseModal = ({
  open,
  handleClose,
  allInterests,
  value: { interests, image },
  onChange,
}: {
  open: boolean;
  handleClose: () => void;
  allInterests: Interest[];
  allImages: string[];
  value: InterestsAndImage;
  onChange: ({ interests, image }: InterestsAndImage) => void;
}): JSX.Element => {
  const [selectedInterests, setSelectedInterests] =
    useState<Interest[]>(interests);
  const [selectedImage, setSelectedImage] = useState<string>(image);

  const handleSubmit = () => {
    onChange({ interests: selectedInterests, image: selectedImage });
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
              variant="contained"
              onClick={handleSubmit}
              endIcon={<SaveIcon />}
              style={{ backgroundColor: colours.primary, color: 'white' }}
            >
              save
            </Button>
          </Grid>
        </Grid>
      </PersonalisePaper>
    </Modal>
  );
};
