/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import store from '../../redux/store';

export default function ChangePassword(props) {
  const useStyles = makeStyles((theme) => ({
    paper: {
      height: theme.settingsDialog.height,
      boxShadow: 'none',
      overflow: 'hidden',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 'none',
      margin: '0 auto',
      alignItems: 'center',
    },
    iconButton: {
      position: 'absolute',
      left: 6,
      top: 6,
      padding: 10,
    },
    dialogTitle: {
      backgroundColor: theme.palette.background.light,
      paddingTop: 5,
      paddingBottom: 10,
    },
    dialogTitleTypography: {
      textAlign: 'center',
      marginTop: 8,
    },
    backdrop: {
      background: 'transparent',
    },
  }));

  const classes = useStyles();

  const setNotification = (severity, message) => {
    store.dispatch({
      type: 'OPEN',
      severity,
      message,
      autoHideDuration: 5000,
    });
  };

  const [oldPassword, setOldPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [newPasswordCheckError, setNewPasswordCheckError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword) setOldPasswordError(true);
    if (!newPassword) setNewPasswordError(true);
    if (!newPasswordCheck) setNewPasswordCheckError(true);
    if (!newPasswordCheck || !newPassword || !oldPassword) return setNotification('error', 'Not all fields have been entered');

    if (newPassword !== newPasswordCheck) {
      setNewPasswordError(true);
      setNewPasswordCheckError(true);
      setNotification('error', 'Enter the same password twice for verification');
      return null;
    }
    if (newPassword.length < 5) {
      setNewPasswordError(true);
      setNewPasswordCheckError(true);
      setNotification('error', 'The password needs to be at least 5 characters long');
      return null;
    }

    fetch('/api/user/changePassword', {
      method: 'post',
      body: JSON.stringify({ oldPassword, newPasswordCheck, newPassword }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setNotification('success', data.msg);
      })
      .catch(() => {
        setNotification('error', 'Unknown error');
      });
    return null;
  };

  const onOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
    if (e.target.value === '') {
      setOldPasswordError(true);
    } else {
      setOldPasswordError(false);
    }
  };
  const onNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (e.target.value === '') {
      setNewPasswordError(true);
    } else {
      setNewPasswordError(false);
    }
  };
  const onNewPassowordCheckChange = (e) => {
    setNewPasswordCheck(e.target.value);
    if (e.target.value === '') {
      setNewPasswordCheckError(true);
    } else {
      setNewPasswordCheckError(false);
    }
  };

  return (
    <Dialog PaperProps={{ classes: { root: classes.paper } }} BackdropProps={{ classes: { root: classes.backdrop } }} fullWidth open={props.show} onClose={() => props.setShow(false)} aria-labelledby="form-dialog-title-changePass" maxWidth="md">
      <DialogTitle disableTypography classes={{ root: classes.dialogTitle }} id="form-dialog-title-changePass">
        <IconButton onClick={() => props.setShow(false)} classes={{ root: classes.iconButton }}><ChevronLeftIcon /></IconButton>
        <Typography classes={{ root: classes.dialogTitleTypography }} variant="h5">Change Password</Typography>
      </DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off" className={classes.form} onSubmit={handleChangePassword}>
          <TextField error={oldPasswordError} onChange={onOldPasswordChange} id="old-password-reset" label="Old password" />
          <br />
          <br />
          <TextField error={newPasswordError} onChange={onNewPasswordChange} id="new-password-reset" label="New password" />
          <br />
          <br />
          <TextField error={newPasswordCheckError} onChange={onNewPassowordCheckChange} id="new-passwordCheck-reset" label="New password check" />
          <Button type="submit" variant="contained">Zmień hasło</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
