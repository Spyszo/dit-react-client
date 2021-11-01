/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { useForm, Controller } from 'react-hook-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setNotification } from '../../../layout/Notification';

export default function ThirdStep(props) {
  const { handleSubmit, control, errors: fieldsErrors } = useForm();
  const { email, resetToken } = props;

  const [loading, setLoading] = useState(false);

  const resetPassword = async (formData) => {
    const { newPassword, newPasswordCheck } = formData;

    if (newPassword || newPasswordCheck) return;
    if (newPassword !== newPasswordCheck) return;

    setLoading(true);
    fetch('/api/user/resetPassword', {
      method: 'post',
      body: JSON.stringify({
        email, resetToken, newPassword, newPasswordCheck,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.err) {
          setNotification({
            open: true,
            severity: 'error',
            message: data.err,
          });
        } else {
          props.hideThis();
          setNotification({
            open: true,
            severity: 'success',
            message: data.msg,
          });
        }
      })
      .catch(() => {
        setLoading(false);
        setNotification({
          open: true,
          severity: 'error',
          message: 'Unknown error',
        });
      });
  };

  const useStyles = makeStyles((theme) => ({
    form: {
      maxWidth: '20em',
      textAlign: 'center',
    },
    errorMessage: {
      position: 'absolute',
      top: 47,
    },
    submitButton: {
      margin: '10px 0 20px 0',
      background: theme.palette.primaryIfLight.main,
      width: 225,
      color: '#fff',
    },
    textField: {
      marginBottom: 20,
      width: 225,
    },
    wrapper: {
      position: 'relative',
    },
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -16,
      marginLeft: -16,
    },
  }));

  const classes = useStyles();

  return (
    <form noValidate className={classes.form} onSubmit={handleSubmit(resetPassword)}>
      <p>Enter token, that you have received on email.</p>

      <FormControl>
        <Controller
          name="newPassword"
          as={(
            <TextField
              id="password-reset-newPassword"
              label="New Password"
              type="password"
              autoComplete="off"
              color="primary"
              inputProps={{ className: classes.textFieldInput }}
              error={fieldsErrors.newPassword}
              helperText={fieldsErrors.newPassword ? fieldsErrors.newPassword.message : null}
              FormHelperTextProps={{ classes: { root: classes.errorMessage } }}
              classes={{ root: classes.textField }}
            />
                  )}
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
      </FormControl>

      <FormControl>
        <Controller
          name="newPasswordCheck"
          as={(
            <TextField
              id="password-reset-newPasswordCheck"
              label="New Password Check"
              type="password"
              autoComplete="off"
              color="primary"
              inputProps={{ className: classes.textFieldInput }}
              error={fieldsErrors.newPasswordCheck}
              helperText={fieldsErrors.newPasswordCheck
                ? fieldsErrors.newPasswordCheck.message
                : null}
              FormHelperTextProps={{ classes: { root: classes.errorMessage } }}
              classes={{ root: classes.textField }}
            />
                  )}
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
      </FormControl>

      <div className={classes.wrapper}>
        <Button disabled={loading} classes={{ root: classes.submitButton }} type="submit">Reset Password</Button>
        { loading && <CircularProgress size={24} className={classes.buttonProgress} /> }
      </div>
    </form>
  );
}
