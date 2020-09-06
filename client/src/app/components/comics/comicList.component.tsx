import React, { useEffect, useState } from 'react';
import { fetchfromApi } from 'app/services';
import { useTitle } from 'app/hooks/useTitle.hook';
import {
  makeStyles,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import comicImg from 'assets/ggTavern.png';
import { IComic } from './comicImg.model';
import { ComicCarousel } from './comiccarousel.component';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  listItem: {
    cursor: 'pointer',
    '& :hover': {
      opacity: '.8',
    },
  },
  h2: {
    textAlign: 'center',
  },
}));

export const ComicList = () => {
  const [comicList, setComicList] = useState<IComicIndex>();
  const [currentComic, setCurrentComic] = useState<string>();
  const classes = useStyles();
  useTitle('GGTavern - Comics');

  useEffect(() => {
    getComicIndex().then((list) => {
      setComicList(list);
    });
  }, []);

  const handleComicClick = (comic: string) => {
    setCurrentComic(comic);
  };

  return (
    <div>
      <h2 className={classes.h2}>GGTavern Comics</h2>
      <ComicCarousel comic={currentComic} />
      <div className={classes.root}>
        <GridList key='Subheader' cols={2} style={{ height: 'auto' }}>
          {comicList?.groupings.map((comic) => (
            <GridListTile
              className={classes.listItem}
              key={comic?.groupName}
              onClick={(_) => handleComicClick(comic.groupName)}>
              <img
                src={
                  comic?.firstImg
                    ? 'data:image/jpg;base64,' + comic.firstImg
                    : comicImg
                }
                alt='comic'
              />
              <GridListTileBar
                title={comic.publicName}
                subtitle={<span>posted: {comic.postDateString}</span>}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
};

interface IComicIndex {
  comicGrouping: number;
  groupings: {
    groupName: string;
    publicName: string;
    postDate: Date;
    firstImg?: string;
    postDateString?: string;
  }[];
}

const getComicIndex = async (): Promise<IComicIndex> => {
  const mapping = (
    await fetchfromApi<IComicIndex[]>('api/mongo/comics', {
      comicGrouping: 'index',
    })
  )[0];
  mapping.groupings = await Promise.all(
    mapping.groupings
      .slice(0)
      .reverse()
      .map(async (grouping) => {
        const img = await getComicFirstImage(grouping.groupName);
        grouping.firstImg = img;
        grouping.postDateString = new Date(
          grouping.postDate
        ).toLocaleDateString();
        return grouping;
      })
  );

  return mapping;
};

const getComicFirstImage = async (grouping: string): Promise<string> => {
  const firstImg = await fetchfromApi<IComic[]>('api/mongo/comics', {
    comicGrouping: grouping,
    index: 0,
  });
  return firstImg[0]?.encoded;
};
