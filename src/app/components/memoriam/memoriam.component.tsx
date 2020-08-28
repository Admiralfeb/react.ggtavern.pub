import React, { useEffect, useState } from 'react';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { MemoriamImage } from './memoriam-image.component';
import { useTitle } from 'app/hooks/useTitle.hook';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { getItems } from 'app/services/db';
import { getFromStorage } from 'app/services/storage';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    height: '80%',
  },
  boxLarge: {
    lineHeight: 0,
    padding: 10,
    width: '80%',
    height: 'auto',
    borderStyle: 'double',
    borderColor: theme.palette.secondary.main,
    borderWidth: 5,
    margin: '0 auto',
    textAlign: 'center',
    columnCount: 6,
    columnGap: 0,
    MozColumnCount: 6,
    MozColumnGap: 0,
    WebkitColumnCount: 6,
    WebkitColumnGap: 0,
    '& img': {
      width: '100%',
      height: 'auto',
    },
  },
  boxMed: {
    lineHeight: 0,
    padding: 10,
    width: '80%',
    height: 'auto',
    borderStyle: 'double',
    borderColor: theme.palette.secondary.main,
    borderWidth: 5,
    margin: '0 auto',
    textAlign: 'center',
    columnCount: 4,
    columnGap: 0,
    MozColumnCount: 4,
    MozColumnGap: 0,
    WebkitColumnCount: 4,
    WebkitColumnGap: 0,
    '& img': {
      width: '100%',
      height: 'auto',
    },
  },
  boxSmall: {
    lineHeight: 0,
    padding: 10,
    width: '80%',
    height: 'auto',
    borderStyle: 'double',
    borderColor: theme.palette.secondary.main,
    borderWidth: 5,
    margin: '0 auto',
    textAlign: 'center',
    columnCount: 1,
    columnGap: 0,
    MozColumnCount: 1,
    MozColumnGap: 0,
    WebkitColumnCount: 1,
    WebkitColumnGap: 0,
    '& img': {
      width: '100%',
      height: 'auto',
    },
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export const Memoriam = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMed = useMediaQuery(theme.breakpoints.up('md'));
  const isLarger = useMediaQuery(theme.breakpoints.up('lg'));
  useTitle('GGTavern - In Memoriam');
  const [imgState, setImgState] = useState<IMapping[]>();

  useEffect(() => {
    const asyncCall = async () => {
      setImgState(await getImgLocations());
    };
    asyncCall();
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={classes.root}>
      <h3>This is a place to celebrate the fun that was had at Goblin.</h3>
      <p>Click/tap on the images to see them larger.</p>
      <div
        className={
          isLarger
            ? classes.boxLarge
            : isMed
            ? classes.boxMed
            : classes.boxSmall
        }>
        {imgState &&
          imgState.map((img, index) => {
            return <MemoriamImage key={index} src={img.path} alt={img.alt} />;
          })}
      </div>
      <Fab color='primary' className={classes.fab} onClick={scrollTop}>
        <KeyboardArrowUpIcon />
      </Fab>
    </div>
  );
};

interface IMapping {
  src: string;
  alt: string;
  path?: string;
}
interface IMap {
  imgMap: IMapping[];
}

const getImgLocations = async (): Promise<IMapping[]> => {
  let mapping = await getItems<IMap>('memoriam');
  console.log(mapping[0]);
  let singleMapping = mapping[0].imgMap;
  const finalMapping = await Promise.all(
    singleMapping.map(async (mappy) => {
      const value = await getFromStorage(
        `gs://gg-tavern.appspot.com/public/img/memoriam/${mappy.src}`
      );
      mappy.path = value as string;

      return mappy;
    })
  );
  return finalMapping;
};
