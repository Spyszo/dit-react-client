import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AccountMenu from './AccountMenu';
import userContext from '../../context/userContext';
import Auth from './auth/Auth';
import store from '../../redux/store';

export default function AccountButton() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState();

  store.subscribe(() => {
    setUser(store.getState());
  });

  const [openAuth, setOpenAuth] = useState(false);

  const { userData } = useContext(userContext);

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  const handleOpenAuth = () => {
    setOpenAuth(true);
  };

  const handleCloseAuth = () => {
    setOpenAuth(false);
  };

  return (
    <Box>
      { userData.displayName
        ? <AccountMenu />
        : (
          <Box>
            <Button color="inherit" className={classes.button} variant="outlined" onClick={handleOpenAuth}>Login</Button>
            <Auth open={openAuth} close={handleCloseAuth} />
          </Box>
        )}
    </Box>
  );
}
