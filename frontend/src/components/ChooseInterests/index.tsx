import {
  Button,
  Divider,
  Grid,
  Modal,
  Paper,
  Typography
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import React, { useState } from 'react';
import { Interest } from '../../utils/types';

const InterestChip = ({
  interest,
  checked,
  onClick,
}: {
  interest: Interest;
  checked?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Button
      variant="outlined"
      style={{
        borderRadius: 9999,
        borderColor: checked ? 'black' : undefined,
        textTransform: 'none',
      }}
      startIcon={<SportsBasketballIcon />} // insert image here
      endIcon={<CheckIcon style={{ opacity: checked ? '100%' : '0%' }} />}
      onClick={onClick}
    >
      {interest.name}
    </Button>
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
      <Paper
        style={{
          width: '400px', // TODO styling based on percentages
          padding: '20px',

          top: '50%',
          left: '50%',
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Grid container spacing={1}>
          <Grid item>
            <Typography>Choose your interests</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item>
            <Grid container spacing={1}>
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

          <Grid item>
            <Button variant="outlined" onClick={handleSubmit}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};
