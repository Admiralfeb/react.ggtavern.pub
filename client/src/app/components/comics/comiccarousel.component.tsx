import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import React, { useState, useEffect } from 'react';
import { IComic } from './comicImg.model';
import { fetchfromApi, sortItems } from 'app/services';
import { makeStyles } from '@material-ui/core';

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
  img: {
    width: 400,
  },
});

export const ComicCarousel = (props: { comic: string | undefined }) => {
  const [value, setValue] = useState(0);
  const [comicStrip, setComicStrip] = useState<IComic[]>();
  const classes = useStyles();

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
            className={classes.img}
            src={'data:image/jpg;base64,' + comic.encoded}
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
  return comicStrip;
};
