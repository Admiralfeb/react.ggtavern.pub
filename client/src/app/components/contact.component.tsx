import React from 'react';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import fbIcon from 'assets/facebook.png';
import discordIcon from 'assets/discord.png';
import youtubeIcon from 'assets/youtube.png';
import instaIcon from 'assets/insta.png';
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

export const Contact = () => {
  const classes = useStyles();
  useTitle('GGTavern - Contact');

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <h2>Contact Us</h2>
          <section>
            <h3>Open a channel (phone)</h3>
            <Link href='tel:1-316-992-0300'>(316) 992-0300</Link>
          </section>

          <section>
            <h3>Use a familiar (email)</h3>
            <Link
              href='mailto:grinninggoblin@ggtavern.pub'
              target='_blank'
              rel='noopener noreferrer'>
              GrinningGoblin@ggtavern.pub
            </Link>
          </section>

          <section>
            <h3>
              Goblins are quite social.
              <br />
              Click/Tap to go to their profiles
            </h3>
            <div className={classes.socialIcons}>
              <IconButton
                href='https://facebook.com/ggtavern'
                target='_blank'
                rel='noopener noreferrer'
                color='primary'>
                <img src={fbIcon} alt='Facebook' />
              </IconButton>
              <IconButton
                href='https://discord.gg/7W3ZWRe'
                target='_blank'
                rel='noopener noreferrer'
                color='primary'>
                <img src={discordIcon} alt='Facebook' />
              </IconButton>
              <IconButton
                href='https://www.youtube.com/user/wsuartgirl'
                target='_blank'
                rel='noopener noreferrer'
                color='primary'>
                <img src={youtubeIcon} alt='Facebook' />
              </IconButton>
              <IconButton
                href='https://www.instagram.com/grinning_goblin_gaming_tavern/?hl=en'
                target='_blank'
                rel='noopener noreferrer'
                color='primary'>
                <img src={instaIcon} alt='Facebook' />
              </IconButton>
            </div>
          </section>

          <section>
            <h3>Find the tavern</h3>
            <p>
              Sadly, the Tavern was displaced by the blight of the year
              (Covid-19).
              <br />
              Join us online until we rise again.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};
