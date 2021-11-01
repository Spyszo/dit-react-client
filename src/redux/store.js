/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';

function notification(state, action) {
  switch (action.type) {
    case 'OPEN':
      return {
        ...state,
        open: true,
        severity: action.severity,
        message: action.message,
        autoHideDuration: action.autoHideDuration ? action.autoHideDuration : 2500,
      };
    default:
      return state;
  }
}

const store = createStore(
  notification,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
