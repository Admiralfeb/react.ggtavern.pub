import React from 'react';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import { useTitle } from 'app/hooks/useTitle.hook';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  card: {
    minWidth: 300,
    maxWidth: 500,
    margin: '0 auto',
    '& h3': {
      marginBottom: 0,
    },
  },
  socialIcons: {
    '& img': {
      width: 30,
      height: 30,
      margin: '3px 0',
    },
  },
});

export const AboutAuthor = () => {
  const classes = useStyles();
  useTitle('GGTavern - About the Author');

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <h2>About the Author</h2>

          <section>
            <h3>Who am I?</h3>
            <p>
              Hi. You found me. I'm Zachary. I wrote this page for Goblin. I
              found many friends and new family at the tavern and I find that I
              miss them all since Goblin closed in March of 2020.
            </p>
            <p>
              I wrote this in the hopes that Pat and Jen will adopt it as the
              Goblin's official page and, mayhaps, make me their WebDev.
            </p>
          </section>

          <section>
            <h3>Site Code? Sure</h3>
            <p>
              Since you worked so hard to find this, here's the website code if
              you're interested.
            </p>
            <p>
              The site uses the MERN setup. (MongoDB, Express, React, and Node).{' '}
            </p>
            <Link
              href='https://github.com/Admiralfeb/ggtavern.pub-react'
              target='_blank'
              rel='noopener noreferrer'>
              Github repository
            </Link>
          </section>

          <section>
            <h3>Email Me</h3>
            <Link
              href='mailto:zachary@admiralfeb.net'
              target='_blank'
              rel='noopener noreferrer'>
              Zachary@admiralfeb.net
            </Link>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};
