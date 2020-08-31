import React from 'react';
import { makeStyles } from '@material-ui/core';
import logo from 'assets/ggTavern.png';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding: 10,
  },
  rules: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  rule: {
    flexGrow: 1,
    borderWidth: '5px',
    borderStyle: 'solid',
    borderColor: theme.palette.secondary.main,
    borderRadius: 30,
    margin: 5,
    padding: 5,
  },
}));

export const FoodHome = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img width='300' alt='Goblin Logo' src={logo} />
      <h2>Menu categories are in the menu from the top left.</h2>
      <h3>
        Warning: If you are allergic to anything, let your friendly barstaff
        know.
      </h3>
      <h3>
        We can make any alcoholic beverage provided we have the receipe and the
        ingredients. Talk to your bartender about ordering.
      </h3>
    </div>
  );
};
