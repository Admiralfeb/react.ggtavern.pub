import React from 'react';
import img from 'assets/construction.png';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
    fontFamily: '"Press Start 2P"',
  },
});

export const UnderConstruction = (props: { title?: string }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h2 data-testid='title'>{props?.title}</h2>
      <h3>This page is currently under construction.</h3>
      <img
        id='imgUnderConstruction'
        width='300'
        alt='Under Construction'
        src={img}
      />
    </div>
  );
};
