import React, { useState, useEffect } from 'react';
import { FoodDrawer } from './food-drawer.component';
import { FoodHome } from './food-home.component';
import { FoodList } from './food-list.component';
import { Toolbar, IconButton, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useTitle } from 'app/hooks/useTitle.hook';
import { MenuSection, MenuItem } from './models';
import { getItems, sortItems } from 'app/services';

const useStyles = makeStyles({
  sysName: {
    marginLeft: 10,
  },
});

export const Foods = () => {
  useTitle('GGTavern - Food');
  const [showDrawer, setShowDrawer] = useState(false);
  const [sectionList, setSectionList] = useState<MenuSection[]>();
  const [currentSection, setcurrentSection] = useState<MenuSection>();
  const classes = useStyles();

  useEffect(() => {
    getSections()
      .then((sections) => {
        setSectionList(sections);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Toolbar>
        <IconButton onClick={() => setShowDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <h2 className={classes.sysName}>
          {currentSection?.name ?? 'Food Menu'}
        </h2>
      </Toolbar>
      <FoodDrawer
        show={showDrawer}
        updateShow={setShowDrawer}
        sectionList={sectionList}
        updateCurrentSection={setcurrentSection}></FoodDrawer>
      {currentSection === undefined ? (
        <FoodHome />
      ) : (
        <FoodList section={currentSection} />
      )}
    </>
  );
};

const getSections = async (): Promise<MenuSection[]> => {
  const pathString = 'menu';
  try {
    let sections: MenuSection[] = [];
    const itemData = await getItems<MenuSection>(pathString);
    sections = sortItems(itemData, 'name');
    sections = itemData.map((section) => {
      let items = section.items;
      items = sortMenuItems<MenuItem, keyof MenuItem>(items!, 'name');
      section.items = items;
      return section;
    });
    return sections;
  } catch (err) {
    throw err;
  }
};

const sortMenuItems = <T extends MenuItem, P extends keyof T>(
  items: T[],
  sortField: P
): T[] => {
  let sortedItems = sortItems<T, P>(items, sortField);
  if (sortedItems && sortedItems.length > 0) {
    if (sortedItems[0].hasOwnProperty('price')) {
      sortedItems = movePriciestIteminList(sortedItems);
    }
  }
  return sortedItems;
};

/**
 * Finds item with highest price and moves it to index 0.
 * @param items items to sort
 */
const movePriciestIteminList = <T extends MenuItem>(items: T[]): T[] => {
  const priciestItem: T = getPriciestItem<T>(items);
  const itemIndex = items.indexOf(priciestItem);
  const newItems = [
    priciestItem,
    ...items.slice(0, itemIndex),
    ...items.slice(itemIndex + 1),
  ];
  return newItems;
};

const getPriciestItem = <T extends MenuItem>(items: T[]): T => {
  let currentHighest: T = items[0];
  let currentPrice = 0;
  for (const item of items) {
    const itemPrice = parseFloat(item.price!);
    if (!currentHighest) {
      currentHighest = item;
      currentPrice = parseFloat(currentHighest.price!);
    } else if (itemPrice > currentPrice) {
      currentHighest = item;
      currentPrice = parseFloat(currentHighest.price!);
    }
  }
  return currentHighest;
};
