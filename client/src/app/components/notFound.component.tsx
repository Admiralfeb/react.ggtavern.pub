import React from 'react';
import { makeStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';
import image from 'assets/404-error.jpg';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    margin: 5,
  },
  img: {
    maxWidth: '100%',
    height: 500,
  },
});

export const NotFoundComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <p>
        DM: You make a wrong turn and end up in the 404 Goblin workshop. Grumpy
        has a toy he wants to try on you. It looks like it might hurt if it
        bites. Gabby looks like she's itching for a fight ... or a meal, either
        way, those eyes spell danger. If anything happens to you, you won't be
        found.
      </p>
      <p>
        You can head back{' '}
        <Link to='/' component={NavLink}>
          home
        </Link>{' '}
        if you want to avoid being dinner.
      </p>
      <img className={classes.img} alt='404 Error: Not Found' src={image} />
    </div>
  );
};
