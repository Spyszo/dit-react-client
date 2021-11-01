import { createMuiTheme } from '@material-ui/core/styles';

export default function theme(ifDarkTheme) {
  return (
    createMuiTheme({
      palette: {
        type: ifDarkTheme ? 'dark' : 'light',
        background: {
          light: ifDarkTheme ? '#333333' : '#ffffff',
          main: ifDarkTheme ? '#212121' : '#f0f0f0',
          dark: ifDarkTheme ? '#202020' : '#dcdcdc',

          default: ifDarkTheme ? '#212121' : '#f0f0f0',
          contrastText: ifDarkTheme ? '#f0f0f0' : '#212121',
        },

        primary: {
          light: '#971243',
          main: '#d81b60',
          dark: '#df487f',
          contrastText: '#fff',
        },

        secondary: {
          light: '#9500ae',
          main: '#d500f9',
          dark: '#dd33fa',
          contrastText: '#fff',
        },

        primaryIfLight: {
          light: ifDarkTheme ? '#333333' : '#D81B60',
          main: ifDarkTheme ? '#333333' : '#d81b60',
          dark: ifDarkTheme ? '#202020' : '#df487f',
          contrastText: '#fff',
        },

        white: {
          light: '#fff',
          main: '#hhh',
          dark: '#ccc',
          contrastText: '#fff',
        },
        dialogTitle: {
          background: ifDarkTheme ? '35,35,35' : '216, 27, 96',
          text: ifDarkTheme ? '#dbdbdb' : '#fff',
        },
      },

      settingsDialog: {
        height: 400,
      },

      breakpoints: {
        values: {
          xs: 200,
          sm: 300,
          md: 700,
          lg: 1280,
          xl: 1920,

        },
      },
    })
  );
}
