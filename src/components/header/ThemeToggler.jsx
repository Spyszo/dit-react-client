import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import { makeStyles } from '@material-ui/core/styles';
import userContext from '../../context/userContext';

export default function ThemeToggler() {
  const { toggleTheme } = useContext(userContext);

  const useStyles = makeStyles(() => ({
    iconButton: {
      padding: 7,
      marginRight: 5,
    },
  }));

  const classes = useStyles();

  return (
    <IconButton className={classes.iconButton} edge="start" color="inherit" aria-label="change theme" onClick={toggleTheme}>
      <BrightnessHighIcon />
    </IconButton>
  );
}
