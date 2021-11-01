/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useForm, Controller } from 'react-hook-form';
import { setNotification } from '../../layout/Notification';

export default function Register(props) {
  const { handleSubmit, control, errors: fieldsErrors } = useForm();

  const [loading, setLoading] = useState(false);

  const submitNormalRegister = async (formData) => {
    const {
      email, password, passwordCheck, displayName,
    } = formData;
    if (!email || !password || !passwordCheck || !displayName) return;

    setLoading(true);
    fetch('/api/auth/register', {
      method: 'post',
      body: JSON.stringify({
        email, password, passwordCheck, displayName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
      .then(async (response) => {
        const { status } = response;
        const data = await response.json();
        return { ...data, status };
      })
      .then((data) => {
        setLoading(false);
        if (data.status !== 201) {
          setNotification({
            open: true,
            severity: 'error',
            message: data.message,
          });
        } else {
          props.showLoginWindow();
          setNotification({
            open: true,
            severity: 'success',
            message: data.message,
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

    registerForm: {
      maxWidth: '20em',
      textAlign: 'center',
      paddingTop: '1em',
      marginBottom: '3em',
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
    backButton: {
      marginBottom: 10,
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
    <Box display="flex" flexDirection="column" alignItems="center">
      <form className={classes.registerForm} noValidate onSubmit={handleSubmit(submitNormalRegister)} autoComplete="off">
        <FormControl>
          <Controller
            name="displayName"
            as={(
              <TextField
                id="register-displayName"
                label="Display name"
                color="primary"
                error={!!fieldsErrors.displayName}
                helperText={fieldsErrors.displayName ? 'Invalid display name' : null}
                FormHelperTextProps={{ classes: { root: classes.errorMessage } }}
                type="text"
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
            name="email"
            as={(
              <TextField
                id="register-email"
                label="E-mail"
                color="primary"
                type="email"
                error={!!fieldsErrors.email}
                helperText={fieldsErrors.email ? 'Invalid email' : null}
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
              },
            }}
          />
        </FormControl>
        <FormControl>
          <Controller
            name="password"
            as={(
              <TextField
                id="register-password"
                label="Password"
                color="primary"
                type="password"
                autoComplete="new-password"
                error={!!fieldsErrors.password}
                helperText={fieldsErrors.password ? 'Invalid password' : null}
                FormHelperTextProps={{ classes: { root: classes.errorMessage } }}
                classes={{ root: classes.textField }}
              />
                          )}
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 5,
            }}
          />
        </FormControl>
        <FormControl>
          <Controller
            name="passwordCheck"
            as={(
              <TextField
                id="register-passwordCheck"
                label="Password Check"
                color="primary"
                type="password"
                error={!!fieldsErrors.passwordCheck}
                helperText={fieldsErrors.passwordCheck ? 'Invalid password' : null}
                FormHelperTextProps={{ classes: { root: classes.errorMessage } }}
                classes={{ root: classes.textField }}
              />
                          )}
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 5,
            }}
          />
        </FormControl>
        <div className={classes.wrapper}>
          <Button classes={{ root: classes.submitButton }} type="submit">Register</Button>
          { loading && <CircularProgress size={24} className={classes.buttonProgress} /> }
        </div>
      </form>

      <Button className={classes.backButton} onClick={props.showLoginWindow} variant="text">Back to login</Button>
    </Box>
  );
}
