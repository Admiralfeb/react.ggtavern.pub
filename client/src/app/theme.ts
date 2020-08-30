import { createMuiTheme } from '@material-ui/core';

export const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#9d6c33',
    },
    secondary: {
      main: '#7baf5b',
    },
    type: 'dark',
  },

});

darkTheme.overrides = {
  MuiLink: {
    root: {
      color: darkTheme.palette.primary.main,
    }
  },
  MuiButton: {
    root: {
      textTransform: 'initial'
    }
  }
}
