import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import React, { useState, useEffect } from 'react';
import { IComic } from './comicImg.model';
import { fetchfromApi, sortItems } from 'app/services';
import { makeStyles, useTheme, useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles({
  hidden: {
    transition: 'opacity 1s ease-out',
    opacity: 0,
    height: 0,
    overflow: 'hidden',
  },
  shown: {
    opacity: 1,
    height: 'auto',
  },
  imgSmall: {
    width: 400,
  },
  imgLarge: {
    width: 600,
  },
});

export const ComicCarousel = (props: { comic: string | undefined }) => {
  const [value, setValue] = useState(0);
  const [comicStrip, setComicStrip] = useState<IComic[]>();
  const classes = useStyles();
  const theme = useTheme();
  const isLarger = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    if (props.comic) {
      setValue(0);
      getComicStrip(props.comic).then((strip) => setComicStrip(strip));
    }
  }, [props.comic]);

  const onChange = (value: number) => {
    setValue(value);
  };

  return (
    <div className={comicStrip ? classes.shown : classes.hidden}>
      <Carousel value={value} onChange={onChange} dots>
        {comicStrip?.map((comic) => (
          <img
            className={isLarger ? classes.imgLarge : classes.imgSmall}
            src={'data:image/jpg;base64,' + comic.encoded}
            alt=''
          />
        ))}
      </Carousel>
      <Dots value={value} onChange={onChange} />
    </div>
  );
};

const getComicStrip = async (grouping: string): Promise<IComic[]> => {
  const comicStrip = await fetchfromApi<IComic[]>('api/mongo/comics', {
    comicGrouping: grouping,
  });
  const sortedStrip = sortItems(comicStrip, 'index');
  return sortedStrip;
};
