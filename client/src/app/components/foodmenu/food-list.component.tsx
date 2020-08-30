import React from 'react';
import {
  makeStyles,
  Divider,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import {
  MenuSection,
  BottleItem,
  DrinkItem,
  FoodItemwFries,
  LiquorItem,
  MiscFoodItem,
  TapItem,
  WineItem,
} from './models';
import { formatAsUSD, formatAsTitleCase } from 'app/services/format';
import { sortItems } from 'app/services';

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

export const FoodList = (props: { section: MenuSection | undefined }) => {
  const classes = useStyles();

  const list = () => {
    if (props.section) {
      const section = props.section;
      switch (section.type) {
        case 'BottleItem': {
          return (
            <BottleList items={(section.items as unknown) as BottleItem[]} />
          );
        }
        case 'DrinkItem': {
          return (
            <DrinkList items={(section.items as unknown) as DrinkItem[]} />
          );
        }
        case 'FoodItemwFries': {
          return (
            <FoodItemwFriesList
              items={(section.items as unknown) as FoodItemwFries[]}
            />
          );
        }
        case 'LiquorItem': {
          return (
            <LiquorList items={(section.items as unknown) as LiquorItem[]} />
          );
        }
        case 'MiscFoodItem': {
          return (
            <MiscFoodList
              items={(section.items as unknown) as MiscFoodItem[]}
            />
          );
        }
        case 'TapItem': {
          return <TapList items={(section.items as unknown) as TapItem[]} />;
        }
        case 'WineItem': {
          return <WineList items={(section.items as unknown) as WineItem[]} />;
        }
        default: {
          return <></>;
        }
      }
    } else {
      return <></>;
    }
  };

  return (
    <div className={classes.root}>
      <Divider />
      {list()}
    </div>
  );
};

const BottleList = (props: { items: BottleItem[] }) => {
  return (
    <>
      {props.items.map((item) => {
        return (
          <Card key={item.name}>
            <CardContent>
              <Typography>
                {item.name} - {item.ABV}
              </Typography>
              <Typography>{formatAsUSD(item.price!)}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};
const DrinkList = (props: { items: DrinkItem[] }) => {
  return (
    <>
      {props.items.map((item) => {
        return (
          <Card key={item.name}>
            <CardContent>
              <Typography>{item.name}</Typography>
              <Typography>{formatAsUSD(item.price!)}</Typography>
              <Typography color='textSecondary'>{item.ingredients}</Typography>
              <Typography color='textSecondary'>{item.note}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};
const FoodItemwFriesList = (props: { items: FoodItemwFries[] }) => {
  return (
    <>
      {props.items.map((item) => {
        return (
          <Card key={item.name}>
            <CardContent>
              <Typography>{item.name}</Typography>
              <Typography>{formatAsUSD(item.price!)}</Typography>
              {item.types && (
                <Typography color='textSecondary'>
                  Choice of: {item.types}
                </Typography>
              )}
              <Typography color='textSecondary'>{item.description}</Typography>
              <Typography color='textSecondary'>{item.note}</Typography>
              {item.includesFries === true && (
                <Typography color='textSecondary'>
                  Includes your choice of sweet potato or regular fries.
                </Typography>
              )}
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};
const LiquorList = (props: { items: LiquorItem[] }) => {
  let items = sortItems(props.items, 'type');
  return (
    <>
      {items.map((item) => {
        return (
          <Card key={item.name}>
            <CardContent>
              <Typography>
                {item.type && <> {formatAsTitleCase(item.type)} - </>}{' '}
                {item.name}
              </Typography>
              <Typography color='textSecondary'>
                {item.ABV} {item.description && <> - {item.description}</>}
              </Typography>
              <Typography color='textSecondary'>{item.note}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};
const MiscFoodList = (props: { items: MiscFoodItem[] }) => {
  return (
    <>
      {props.items.map((item) => {
        return (
          <Card key={item.name}>
            <CardContent>
              <Typography>{item.name}</Typography>
              <Typography>{formatAsUSD(item.price!)}</Typography>
              <Typography color='textSecondary'>{item.description}</Typography>
              {item.types && (
                <Typography color='textSecondary'>
                  Choice of: {item.types}
                </Typography>
              )}
              <Typography color='textSecondary'>{item.note}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};
const TapList = (props: { items: TapItem[] }) => {
  return (
    <>
      {props.items.map((item) => {
        return (
          <Card key={item.name}>
            <CardContent>
              <Typography>
                {item.name} - {item.ABV}
              </Typography>
              <Typography>16 oz - {formatAsUSD(item.pricePint!)}</Typography>
              <Typography>32 oz - {formatAsUSD(item.priceMug!)}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};
const WineList = (props: { items: WineItem[] }) => {
  return (
    <>
      {props.items.map((item) => {
        return (
          <Card key={item.name}>
            <CardContent>
              <Typography>{item.name}</Typography>
              <Typography>{formatAsUSD(item.price!)}</Typography>
              {item.types && (
                <Typography color='textSecondary'>
                  Choice of: {item.types}
                </Typography>
              )}
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};
