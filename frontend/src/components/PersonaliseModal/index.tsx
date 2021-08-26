import { Divider, Grid, Modal, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { images } from '../../user-profiles';
import { Interest } from '../../utils/types';
import { InterestChip } from '../InterestChip';
import {
  CaptionTypography,
  FlexGrid,
  ImageIconButton,
  ImagesGrid,
  InterestGrid,
  PersonalisePaper,
  UserImage,
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

  useEffect(() => {
    onChange({ interests: selectedInterests, image: selectedImage });
  }, [selectedInterests, selectedImage]);

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
            <InterestGrid container spacing={1}>
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
            </InterestGrid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <CaptionTypography>Choose profile image</CaptionTypography>
          </Grid>
          <Grid item>
            <ImagesGrid container justifyContent="center" spacing={1}>
              {images.map((image, index) => {
                return (
                  <Grid item key={index}>
                    <ImageIconButton
                      $selected={image === selectedImage}
                      onClick={() => {
                        setSelectedImage(image);
                      }}
                    >
                      <UserImage src={image} alt="" />
                    </ImageIconButton>
                  </Grid>
                );
              })}
            </ImagesGrid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <FlexGrid item />
        </Grid>
      </PersonalisePaper>
    </Modal>
  );
};
