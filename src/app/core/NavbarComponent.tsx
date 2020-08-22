import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from 'assets/ggTavern.png';
import { Button, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

import useStyles from './NavbarStyles';

export default function NavbarComponent() {
  const classes = useStyles();
  return (
    <nav className={classes.root}>
      <Link to='/home' id='homeImage'>
        <img
          id='gg-img'
          src={logo}
          alt='ggtavern-logo'
          className={classes.img}></img>
      </Link>
      <IconButton
        to='/home'
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
    </nav>
  );
}
