import React, { useEffect, MouseEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { GameSystem } from './game.model';

const useStyles = makeStyles({
  root: {
    marginLeft: 10,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export const GameDrawer = (props: {
  show: boolean;
  updateShow: (show: boolean) => void;
  systemList: GameSystem[] | undefined;
  updateCurrentSystem: (system: GameSystem | undefined) => void;
}) => {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setShow(open);
    props.updateShow(open);
  };

  const handleSystemClick = (e: MouseEvent) => {
    const clickedSystem = e.currentTarget.getElementsByTagName('span')[0]
      .innerText;

    const selectedSystem =
      clickedSystem === 'Game Home'
        ? undefined
        : props.systemList?.find((system) => system.system === clickedSystem);

    props.updateCurrentSystem(selectedSystem);
  };

  const list = () => (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
      <List>
        {['Game Home'].map((text) => (
          <ListItem button key={text} onClick={handleSystemClick}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {props.systemList?.map((system) => (
          <ListItem button key={system.short} onClick={handleSystemClick}>
            <ListItemText primary={system.system} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {
        <Drawer anchor='left' open={show} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      }
    </div>
  );
};
