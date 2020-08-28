import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from 'assets/ggTavern.png';
import { Button, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { signOut } from 'app/services/auth';

import { useAuth } from 'app/hooks/useAuth.hook';

import useStyles from './navbar.styles';

export const NavbarComponent = () => {
  const classes = useStyles();

  const user = useAuth();

  return (
    <nav className={classes.root}>
      <Link to='/' id='homeImage'>
        <img
          id='gg-img'
          src={logo}
          alt='ggtavern-logo'
          className={classes.img}></img>
      </Link>
      <IconButton
        exact
        to='/'
        className={classes.navLink}
        activeClassName={classes.active}
        component={NavLink}>
        <HomeIcon />
      </IconButton>
      <Button
        to='/contact'
        className={classes.navLink}
        activeClassName={classes.active}
        component={NavLink}>
        Contact Us
      </Button>
      <Button
        to='/memoriam'
        className={classes.navLink}
        activeClassName={classes.active}
        component={NavLink}>
        In Memoriam
      </Button>
      <div className='filler' />
      {user?.isAnonymous === false && (
        <Button onClick={signOut}>Sign Out</Button>
      )}
    </nav>
  );
};
