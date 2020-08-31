import React from 'react';

import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { darkTheme } from './theme';
import { SnackbarProvider } from 'notistack';
import { createBrowserHistory } from 'history';

import { Router } from 'react-router-dom';
import { NavbarComponent } from 'app/navbar.component';
import { AppRoutes } from './app.routes';

export default function App() {
  const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

  return (
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider maxSnack={2}>
        <CssBaseline />
        <Router history={history}>
          <NavbarComponent />
          <AppRoutes />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
