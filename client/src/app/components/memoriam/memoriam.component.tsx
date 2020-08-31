import React, { useEffect, useState } from 'react';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { MemoriamImage } from './memoriam-image.component';
import { useTitle } from 'app/hooks/useTitle.hook';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useSnackbar } from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchfromApi, sortItems } from 'app/services';

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
  spinner: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export const Memoriam = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMed = useMediaQuery(theme.breakpoints.up('md'));
  const isLarger = useMediaQuery(theme.breakpoints.up('lg'));
  useTitle('GGTavern - In Memoriam');
  const [imgState, setImgState] = useState<IMapping[]>();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const asyncCall = async () => {
      try {
        setImgState(await getImgLocations());
      } catch (err) {
        enqueueSnackbar('Error getting memorial images from server', {
          variant: 'error',
        });
      }
    };
    asyncCall();
  }, [enqueueSnackbar]);

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
        {imgState ? (
          imgState.map((img, index) => {
            return (
              <MemoriamImage
                key={index}
                src={'data:image/jpg;base64,' + img.encoded}
                alt={img.description}
              />
            );
          })
        ) : (
          <div className={classes.spinner}>
            <CircularProgress />
          </div>
        )}
      </div>
      <Fab color='primary' className={classes.fab} onClick={scrollTop}>
        <KeyboardArrowUpIcon />
      </Fab>
    </div>
  );
};

interface IMapping {
  index: number;
  name: string;
  description: string;
  encoded: string;
}

const getImgLocations = async (): Promise<IMapping[]> => {
  const mapping = await fetchfromApi<IMapping[]>('api/mongo/memoriam');
  const finalMapping = sortItems(mapping, 'index');
  return finalMapping;
};
