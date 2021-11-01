import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import './style.css';
import LoadingScreen from './components/pages/LoadingScreen';
import { Notification, setNotification } from './components/layout/Notification';
import theme from './components/themes/Theme';
import Activate from './components/pages/Activate';
import DrawingBoard from './components/pages/DrawingBoard/DrawingBoard';
import Header from './components/header/Header';
import Home from './components/pages/Home';
import UserContext from './context/userContext';

import store from './redux/store';

let loaded = false;

export default function App() {
  const [userData, setUserData] = useState();
  const [ifDarkTheme, setIfDarkTheme] = useState(window.darkTheme);

  const toggleTheme = () => {
    localStorage.setItem('darkTheme', !ifDarkTheme);
    setIfDarkTheme(!ifDarkTheme);
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      const loggedIn = localStorage.getItem('loggedIn');
      if (loggedIn === 'true') {
        fetch('/api/auth/verify', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.authenticated === false) {
              localStorage.setItem('loggedIn', false);
            } else {
              localStorage.setItem('loggedIn', true);
              setUserData({ ...data.user });
            }
          })
          .catch(() => {
            setNotification({
              open: true,
              severity: 'error',
              message: 'Unknown error',
            });
          });
        loaded = true;
      } else {
        loaded = true;
        setUserData({});
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme(ifDarkTheme)}>
          { loaded

            ? (
              <UserContext.Provider value={{
                ifDarkTheme, toggleTheme, userData, setUserData,
              }}
              >
                <Provider store={store}>
                  <Notification />
                  <CssBaseline />

                  <Header />

                  <Switch>
                    <Route
                      path="/"
                      exact
                      render={() => (
                        <Home />
                      )}
                    />
                    <Route
                      path="/activate"
                      render={() => (
                        <Activate />
                      )}
                    />

                    <Route
                      path="/room/:roomId"
                      render={() => (
                        <DrawingBoard />
                      )}
                    />
                  </Switch>

                </Provider>
              </UserContext.Provider>
            )

            : <LoadingScreen show={!loaded} />}
        </ThemeProvider>
      </BrowserRouter>

    </>

  );
}
