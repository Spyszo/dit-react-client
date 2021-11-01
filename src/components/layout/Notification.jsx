/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import store from '../../redux/store';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export class Notification extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      message: '',
      severity: 'error',
      autoHideDuration: 2500,
    };

    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });

    this.closeThis = this.closeThis.bind(this);
  }

  closeThis(event, reason) {
    if (reason === 'clickaway') return;
    this.setState({ open: false });
  }

  render() {
    return (
      <Snackbar open={this.state.open} autoHideDuration={this.state.autoHideDuration} onClose={this.closeThis}>
        <Alert severity={this.state.severity} onClose={this.closeThis}>
          {this.state.message}
        </Alert>
      </Snackbar>
    );
  }
}

export function setNotification(data) {
  store.dispatch({
    type: 'OPEN',
    severity: data.severity,
    message: data.message,
    autoHideDuration: data.autoHideDuration || 2500,
  });
}
