import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Divider,
} from '@material-ui/core';
import { GameSystem } from './game.model';

const useStyles = makeStyles({
  root: {
    marginLeft: 50,
    marginRight: 50,
  },
  note: {
    fontSize: '1rem',
    '& span': {
      fontWeight: 'bold',
    },
  },
});

export const GameList = (props: { gameSystem: GameSystem | undefined }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.gameSystem?.note && (
        <p className={classes.note}>
          <span>Note:</span> {props.gameSystem?.note}
        </p>
      )}
      <Divider />
      {props.gameSystem?.games && (
        <List>
          {props.gameSystem?.games.map((game, i) => {
            return (
              <ListItem key={i}>
                <ListItemText primary={game.name} />
              </ListItem>
            );
          })}
        </List>
      )}
    </div>
  );
};
