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

const rules = [
  'Playing games, unless otherwise stated, is free.',
  'VR costs $10/hour. $1/hr on Sundays',
  'You can bring your own games or systems.',
  `We ask you not to bring Xbox One or Playstation 4 games as they require installation on the system.`,
  'We have 3 Wii U systems, but only one of each of the others.',
  'Please do NOT move systems between the TVs.',
  'The bartender will hold onto your ID during use of a Tavern game.',
  'The lists are not extensive as they are subject to frequent change.',
  'Feel free to donate games to the Tavern!',
];

export const GameHome = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img width='300' alt='Goblin Logo' src={logo} />
      <h2>Game Systems are in the menu from the top left.</h2>
      <h3>See the below information about gaming at the Tavern.</h3>
      <div className={classes.rules}>
        {rules.map((rule, i) => {
          return (
            <div key={i} className={classes.rule}>
              <p>{rule}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
