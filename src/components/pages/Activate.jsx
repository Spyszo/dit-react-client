import React, { useEffect, useState } from 'react';
import queryString from 'query-string';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { setNotification } from '../layout/Notification';

export default function Activate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkIfActivateLink = async () => {
      const activationToken = queryString.parse(window.location.search).token;
      if (!activationToken) return;

      // window.location.href = window.location.origin
      fetch('/api/account/activateAccount', {
        method: 'post',
        body: JSON.stringify({ activationToken }),
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
          setOpen(true);
          if (data.status !== 200) {
            setNotification({
              open: true,
              severity: 'error',
              message: data.message,
              autoHideDuration: 5000,
            });
          } else {
            setNotification({
              open: true,
              severity: 'success',
              message: data.message,
              autoHideDuration: 5000,
            });
          }
        })
        .catch(() => {
          setNotification({
            open: true,
            severity: 'error',
            message: 'Unknown error',
          });
        });
    };
    checkIfActivateLink();
  });

  const handleClose = () => {

  };

  return (
    open
        && (
        <>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Use Google location service?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Disagree
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </>
        )
  );
}
