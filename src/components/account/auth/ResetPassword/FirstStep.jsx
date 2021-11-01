/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { useForm, Controller } from 'react-hook-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setNotification } from '../../../layout/Notification';

export default function FirstStep(props) {
  const { handleSubmit, control, errors: fieldsErrors } = useForm();

  const [loading, setLoading] = useState(false);

  const submitReset = async (formData) => {
    const { email } = formData;
    if (!email) return;

    setLoading(true);
    fetch('/api/user/forgetPassword', {
      method: 'post',
      body: JSON.stringify({ email }),
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
          setNotification({
            open: true,
            severity: 'success',
            message: 'Email with the token has been sent',
          });
          props.goToSecondStep(email);
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

  const handleGoBack = () => {
    props.goBack();
  };

  return (
    <form noValidate className={classes.form} onSubmit={handleSubmit(submitReset)}>
      <p>
        Tell us the email address associated with your account,
        and we’ll send you an email with a link to reset your password.
      </p>

      <FormControl>
        <Controller
          name="email"
          as={(
            <TextField
              id="password-reset-email"
              label="E-mail"
              autoComplete="off"
              color="primary"
              inputProps={{ className: classes.textFieldInput }}
              error={fieldsErrors.email}
              helperText={fieldsErrors.email ? fieldsErrors.email.message : null}
              FormHelperTextProps={{ classes: { root: classes.errorMessage } }}
              classes={{ root: classes.textField }}
            />
                      )}
          control={control}
          defaultValue=""
          rules={{
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'invalid email address',
            },
          }}
        />
      </FormControl>

      <div className={classes.wrapper}>
        <Button disabled={loading} classes={{ root: classes.submitButton }} type="submit">Send reset</Button>
        { loading && <CircularProgress size={24} className={classes.buttonProgress} /> }
      </div>

      <Button onClick={handleGoBack}>Go back</Button>

    </form>
  );
}
