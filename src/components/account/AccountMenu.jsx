/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import AccountSettings from './AccountSettings';
import userContext from '../../context/userContext';

export default function AccountMenu() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const { setUserData, userData } = useContext(userContext);

  const handleOpenDialog = () => {
    setOpenMenu(false);
    setOpenDialog(true);
  };

  const handleToggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      handleCloseMenu();
    }
  }

  const handleLogOut = () => {
    fetch('/api/auth/logout', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then(() => {
        setUserData({});
        localStorage.setItem('loggedIn', false);
      });

    handleCloseMenu();
  };

  // return focus to the button when we transitioned from !open -> open
  const anchorRef = React.useRef(null);
  const prevOpen = React.useRef(openMenu);
  React.useEffect(() => {
    if (prevOpen.current === true && openMenu === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = openMenu;
  }, [openMenu]);

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  return (
    <>
      <div>
        <Button
          className={classes.button}
          ref={anchorRef}
          aria-controls={openMenu ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          variant="outlined"
          startIcon={<AccountCircleIcon />}
          color="inherit"
          onClick={handleToggleMenu}
        >
          {userData.displayName}
        </Button>

        <Popper
          open={openMenu}
          transition
          anchorEl={anchorRef.current}
          style={{ marginTop: 10 }}
        >
          {
                    ({ TransitionProps }) => (
                      <Grow {...TransitionProps}>
                        <Paper>
                          <ClickAwayListener onClickAway={handleCloseMenu}>
                            <MenuList id="menu-list-grow" onKeyDown={handleListKeyDown}>
                              <MenuItem onClick={handleOpenDialog}>Settings</MenuItem>
                              <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )
                }
        </Popper>
      </div>

      <AccountSettings show={openDialog} hideThis={() => setOpenDialog(false)} />
    </>
  );
}
