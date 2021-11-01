/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';

import { setNotification } from '../../layout/Notification';
import userContext from '../../../context/userContext';

export default function Login(props) {
  const { handleSubmit, control, errors: fieldsErrors } = useForm();

  const [loading, setLoading] = useState(false);

  const { setUserData } = useContext(userContext);

  const submitLogin = async (formData) => {
    const { email, password } = formData;
    if (!email || !password) return;

    setLoading(true);
    fetch('/api/auth/login', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(async (response) => {
        const { status } = response;
        const data = await response.json();
        return { ...data, status };
      })
      .then((data) => {
        setLoading(false);
        if (data.status !== 200) {
          setNotification({
            open: true,
            severity: 'error',
            message: data.message,
          });
        } else {
          setUserData({ ...data.user });
          localStorage.setItem('loggedIn', true);
          props.hideThis();
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
    textFieldInput: {
      '&:-webkit-autofill': {
        '-webkit-text-fill-color': '#d81b60',
        transition: 'background-color 5000s ease-in-out 0s',
      },
      '&:-webkit-autofill:hover': {
        '-webkit-text-fill-color': '#d81b60',
        transition: 'background-color 5000s ease-in-out 0s',
      },
      '&:-webkit-autofill:focus': {
        '-webkit-text-fill-color': '#d81b60',
        transition: 'background-color 5000s ease-in-out 0s',
      },
    },

    loginForm: {
      maxWidth: '20em',
      paddingTop: '1em',
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
    divider: {
      marginTop: 20,
      marginBottom: 10,
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      opacity: 0.5,
      '&::after': {
        content: "''",
        flex: 1,
        borderBottom: '1px solid #a6a6a6',
        padding: '0 20px',
        margin: '0 20px',
      },
      '&::before': {
        content: "''",
        flex: 1,
        borderBottom: '1px solid #a6a6a6',
        padding: '0 20px',
        margin: '0 20px',
      },
    },
    forgotButton: {
      fontSize: 11,
      opacity: 0.5,
      marginBottom: 5,
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

  const handleShowRegisterWindow = () => { props.showRegisterWindow(); };

  const handleShowResetPassword = () => { props.showResetPassword(); };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <form className={classes.loginForm} onSubmit={handleSubmit(submitLogin)}>
        <FormControl>
          <Controller
            name="email"
            as={(
              <TextField
                id="login-email"
                label="E-mail"
                color="primary"
                inputProps={{ className: classes.textFieldInput }}
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
                inputProps={{ className: classes.textFieldInput }}
                id="login-password"
                label="Password"
                color="primary"
                type="password"
                error={!!fieldsErrors.password}
                helperText={fieldsErrors.password ? 'Invalid Password' : null}
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
          <Button disabled={loading} classes={{ root: classes.submitButton }} type="submit">LOGIN</Button>
          { loading && <CircularProgress size={24} className={classes.buttonProgress} /> }
        </div>
      </form>

      <Button onClick={handleShowRegisterWindow}>
        Don&apos;t have an account?
        <br />
        {' '}
        Create it!
      </Button>

      <div className={classes.divider}> Or log in with</div>

      <Box margin="0 auto" marginBottom="20px">
        <a href="/api/user/connect/facebook">
          <IconButton aria-label="facebook_button">
            <SvgIcon fontSize="large" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <circle id="back" cx="256" cy="256" r="256" fill="#3a5a99" />
              <path id="Facebook-2" data-name="Facebook" d="M380.55,116H131.45A15.45,15.45,0,0,0,116,131.45V380.55A15.45,15.45,0,0,0,131.45,396h134.1V287.57H229.07V245.31h36.49V214.15c0-36.16,22.09-55.86,54.35-55.86A299.1,299.1,0,0,1,352.51,160v37.8H330.14c-17.55,0-20.95,8.34-20.95,20.57v27H351l-5.45,42.26H309.2V396h71.35A15.45,15.45,0,0,0,396,380.55V131.45A15.45,15.45,0,0,0,380.55,116Z" fill="#fff" />
            </SvgIcon>
          </IconButton>
        </a>
        <a href="/api/user/connect/google">
          <IconButton aria-label="google_button">
            <SvgIcon fontSize="large" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
              <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
              <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
              <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
              <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
            </SvgIcon>
          </IconButton>
        </a>
      </Box>
      <Button
        classes={{ root: classes.forgotButton }}
        onClick={handleShowResetPassword}
      >
        Forgot password?
      </Button>
    </Box>
  );
}
