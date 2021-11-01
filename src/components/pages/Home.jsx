import React from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';

export default function Home() {
  const history = useHistory();

  const handleCreateRoom = () => {
    history.push('/room/createRoom');
  };

  const useStyles = makeStyles((theme) => ({
    nav: {
      backgroundColor: theme.palette.primaryIfLight.main,
      color: theme.palette.primaryIfLight.contrastText,
    },
    iconButton: {
      padding: 7,
      marginRight: 5,
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
    box: {
      userSelect: 'none',
    },
    mainText: {
      fontSize: '3em',
      textAlign: 'center',
    },
    mainTextSpan: {
      fontSize: '1.5em',
      fontWeight: 'bold',
    },
  }));

  const classes = useStyles();

  return (
    <Box className={classes.box} textAlign="center" display="flex" justifyContent="center" alignItems="center" minHeight="calc(100vh - 15em)">
      <Box>
        <p className={classes.mainText}>
          <span className={classes.mainTextSpan}>IN REAL TIME </span>
          <br />
          DRAW IT TOGETHER
        </p>

        <Box>
          <p htmlFor="session_id">Join session</p>
          <br />

          <TextField size="small" color="primary" id="session_id" label="Session ID" />
          <p>OR</p>
          <Button onClick={handleCreateRoom} size="large" color="primary" variant="contained">CREATE YOUR OWN</Button>
        </Box>
      </Box>
    </Box>
  );
}
