/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
import ResetPassword from './ResetPassword/ResetPassword';
import Register from './Register';
import Login from './Login';

let fullScreen = false;

const Transition = React.forwardRef((props, ref) => {
  if (fullScreen) return <Slide direction="up" ref={ref} {...props} />;
  return <Grow ref={ref} {...props} />;
});

export default function Auth(props) {
  const theme = useTheme();
  fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [showContent, setShowContent] = useState({
    login: true,
    register: false,
    resetPassword: false,
    title: 'Log in',
  });

  const useStyles = makeStyles(() => ({
    rootWindow: {
      minHeight: 600,
    },
    paperWidthXs: {
      maxWidth: !fullScreen && 380,
    },
    svgDiv: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: -1,
      overflow: 'hidden',
      '& svg': {
        height: 180,
        width: '100%',
      },
    },
    path: {
      fill: `rgba(${theme.palette.dialogTitle.background},0.6)`,
    },
    dialogTitle: {
      zIndex: 1,
      marginBottom: 110,
      color: theme.palette.dialogTitle.text,
    },
    dialogTitleTypography: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '2em',
      fontFamily: 'Roboto',
      position: 'absolute',
      marginTop: 10,
      top: 20,
      left: 0,
      width: '100%',
    },
    closeButton: {
      position: 'absolute',
      right: 6,
      top: 6,
      padding: 10,
      zIndex: 1,
      color: 'inherit',
    },
  }));
  const classes = useStyles();

  const handleLogin = () => {
    setShowContent({
      login: true,
      register: false,
      resetPassword: false,
      title: 'Log in',
    });
  };

  const handleRegister = () => {
    setShowContent({
      login: false,
      register: true,
      resetPassword: false,
      title: 'Sign in',
    });
  };

  const handleResetPassword = () => {
    setShowContent({
      login: false,
      register: false,
      resetPassword: true,
      title: 'Reset Password',
    });
  };

  const hideDialog = () => {
    props.close();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth="xs"
      fullWidth
      open={props.open}
      TransitionComponent={Transition}
      transitionDuration={200}
      onClose={hideDialog}
      keepMounted
      classes={{ paper: classes.rootWindow, paperWidthXs: classes.paperWidthXs }}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle disableTypography classes={{ root: classes.dialogTitle }} id="form-dialog-title-changePass">
        <Typography classes={{ root: classes.dialogTitleTypography }} variant="h5">{showContent.title}</Typography>
        <IconButton onClick={hideDialog} classes={{ root: classes.closeButton }}>
          <CloseIcon />
        </IconButton>

        <div className={classes.svgDiv}>
          <svg viewBox="0 0 250 120" preserveAspectRatio="none" className={classes.svg}>
            <path d="M-32.27,44.03 C115.02,81.53 302.38,127.90 537.15,36.13 L504.42,-9.23 L-0.00,0.00 Z" className={classes.path} />
          </svg>
        </div>
        <div className={classes.svgDiv}>
          <svg viewBox="0 0 250 120" preserveAspectRatio="none" className={classes.svg}>
            <path d="M-25.49,105.22 C148.32,40.08 303.51,35.15 522.48,114.10 L504.42,-9.23 L-0.00,0.00 Z" className={classes.path} />
          </svg>
        </div>
        <div className={classes.svgDiv}>
          <svg viewBox="0 0 250 120" preserveAspectRatio="none" className={classes.svg}>
            <path d="M-34.51,28.25 C115.02,199.94 304.08,-35.88 513.45,101.27 L504.42,-9.23 L-0.00,0.00 Z" className={classes.path} />
          </svg>
        </div>
      </DialogTitle>
      <DialogContent>
        { showContent.login && <Login hideThis={hideDialog} showResetPassword={handleResetPassword} showRegisterWindow={handleRegister} /> }
        { showContent.register && <Register hideThis={hideDialog} showLoginWindow={handleLogin} /> }
        { showContent.resetPassword && <ResetPassword hideThis={hideDialog} showLoginWindow={handleLogin} /> }
      </DialogContent>
    </Dialog>
  );
}
