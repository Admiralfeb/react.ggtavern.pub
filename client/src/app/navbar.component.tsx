import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from 'assets/ggTavern.png';
import { Button } from '@material-ui/core';
import useStyles from './navbar.styles';

export const NavbarComponent = () => {
  const classes = useStyles();

  return (
    <nav className={classes.root}>
      <Link to='/' id='homeImage'>
        <img
          id='gg-img'
          src={logo}
          alt='ggtavern-logo'
          className={classes.img}></img>
      </Link>
      <Button
        to='/contact'
        className={classes.navLink}
        activeClassName={classes.active}
        component={NavLink}>
        Contact Us
      </Button>
      <Button
        to='/comics'
        className={classes.navLink}
        activeClassName={classes.active}
        component={NavLink}>
        Comics
      </Button>
      <Button
        to='/memoriam'
        className={classes.navLink}
        activeClassName={classes.active}
        component={NavLink}>
        In Memoriam
      </Button>
      <div className='filler' />
    </nav>
  );
};
