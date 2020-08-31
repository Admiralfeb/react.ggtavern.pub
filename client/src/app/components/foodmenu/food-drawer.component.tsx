import React, { useEffect, MouseEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { MenuSection } from './models';

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

export const FoodDrawer = (props: {
  show: boolean;
  updateShow: (show: boolean) => void;
  sectionList: MenuSection[] | undefined;
  updateCurrentSection: (section: MenuSection | undefined) => void;
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
    const clickedSection = e.currentTarget.getElementsByTagName('span')[0]
      .innerText;

    const selectedSection =
      clickedSection === 'Food Home'
        ? undefined
        : props.sectionList?.find((section) => section.name === clickedSection);

    props.updateCurrentSection(selectedSection);
  };

  const list = () => (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
      <List>
        {['Food Home'].map((text) => (
          <ListItem button key={text} onClick={handleSystemClick}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {props.sectionList?.map((section) => (
          <ListItem button key={section.section} onClick={handleSystemClick}>
            <ListItemText primary={section.name} />
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
