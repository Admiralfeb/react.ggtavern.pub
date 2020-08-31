import React from 'react';
import maskImg from 'assets/ggMask.jpg';
import { makeStyles } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useTitle } from 'app/hooks/useTitle.hook';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  old: {
    fontFamily: '"Press Start 2P"',
  },
  imgFull: {
    maxWidth: 400,
    minWidth: 200,
    margin: '0 auto',
  },
  grid: {
    marginTop: 20,
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr',
  },
  middleItems: {
    margin: 'auto',
  },
  flex: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    '& h3': {
      marginTop: 10,
      marginBottom: 10,
      flexGrow: 1,
    },
  },
});

export const Love = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isLarger = useMediaQuery(theme.breakpoints.up('md'));
  useTitle('GGTavern');
  return (
    <div className={classes.root}>
      <h1 className={classes.old}>Grinning Goblin Gaming Tavern</h1>
      <p>
        The Tavern is displaced due to Covid, but even though we are isolated
        and masked, we are in this together.
      </p>
      {isLarger ? <Desktop /> : <Mobile />}
    </div>
  );
};

function Desktop() {
  const classes = useStyles();

  return (
    <div className={classes.grid}>
      <h3>#BlackLivesMatter</h3>
      <h3>#GGTavern</h3>
      <h3>#LoveWins</h3>
      <h3 className={classes.middleItems}>#WeAreInThisTogether</h3>
      <img
        src={maskImg}
        alt='ICT flag with Gabby'
        className={classes.imgFull}
      />
      <h3 className={classes.middleItems}>#WearAMask</h3>
      <h3>#GabbyGoblin</h3>
      <h3>#ICT</h3>
      <h3>#GrumpyGoblin</h3>
    </div>
  );
}

function Mobile() {
  const classes = useStyles();

  return (
    <div>
      <img
        src={maskImg}
        alt='ICT flag with Gabby'
        className={classes.imgFull}
      />
      <div className={classes.flex}>
        <h3>#BlackLivesMatter</h3>
        <h3>#GGTavern</h3>
        <h3>#LoveWins</h3>
        <h3>#WeAreInThisTogether</h3>
        <h3>#WearAMask</h3>
        <h3>#GabbyGoblin</h3>
        <h3>#ICT</h3>
        <h3>#GrumpyGoblin</h3>
      </div>
    </div>
  );
}
