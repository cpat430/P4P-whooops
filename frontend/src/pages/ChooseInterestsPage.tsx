import { Button, Grid, Modal, Paper, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import { useState } from 'react';

type Interest = {
  id: number;
  name: string;
};
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

const allInterests = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
].map((e, i) => {
  return { id: i, name: e } as Interest;
});

const ChooseInterestsModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [userInterests, setUserInterests] = useState<Interest[]>([]);

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
          width: '400px',
          padding: '10px',

          top: `50%`,
          left: `50%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Grid container spacing={1}>
          <Grid item>
            <Typography>Choose your interests:</Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={1}>
              {allInterests.map((interest) => {
                const userInterestIndex = userInterests.findIndex(
                  (userInterest) => {
                    return userInterest.id === interest.id;
                  }
                );

                return (
                  <Grid item>
                    <InterestChip
                      interest={interest}
                      checked={userInterestIndex !== -1}
                      onClick={() => {
                        if (userInterestIndex === -1) {
                          setUserInterests(userInterests.concat(interest));
                        } else {
                          setUserInterests(
                            userInterests.filter((userInterest, index) => {
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
            <Button style={{ textTransform: 'none' }} onClick={handleClose}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

const ChooseInterestsPage = () => {
  const [open, setOpen] = useState(true);
  return (
    <div
      style={{
        height: '100vh',
        width: '100wh',
        backgroundColor: 'pink',
        padding: '10px',
      }}
    >
      <ChooseInterestsModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      ></ChooseInterestsModal>
    </div>
  );
};

export default ChooseInterestsPage;
