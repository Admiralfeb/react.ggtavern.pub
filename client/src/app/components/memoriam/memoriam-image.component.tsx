import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  '@keyframes zoom': {
    from: { transform: 'scale(0)' },
    to: { transform: 'scale(1)' },
  },
  img: {
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': { opacity: 0.7 },
  },
  modalHidden: {
    display: 'none',
    position: 'fixed',
    zIndex: 1,
    paddingTop: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgb(0,0,0,0.9)',
  },
  modalShown: {
    display: 'block',
    position: 'fixed',
    zIndex: 1,
    paddingTop: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgb(0,0,0,0.9)',
  },
  modalContent: {
    margin: 'auto',
    display: 'block',
    width: '80%',
    maxWidth: 700,
    animationName: '$zoom',
    animationDuration: '0.6s',
  },
  close: {
    position: 'absolute',
    top: '15px',
    right: '35px',
    color: '#f1f1f1',
    fontSize: '40px',
    fontWeight: 'bold',
    transition: '0.3s',
    '&:hover': {
      color: '#bbb',
      textDecoration: 'none',
      cursor: 'pointer',
    },
  },
  caption: {
    margin: 'auto',
    display: 'block',
    width: '80%',
    maxWidth: 700,
    textAlign: 'center',
    color: '#ccc',
    padding: '10px 0',
    height: 200,
  },
});

export const MemoriamImage = (props: {
  src: any;
  alt: string;
  description?: string;
}) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  return (
    <>
      <img
        src={props.src}
        alt={props.alt}
        className={classes.img}
        onClick={toggleModal}
      />
      <div className={modal ? classes.modalShown : classes.modalHidden}>
        <span className={classes.close} onClick={toggleModal}>
          &times;
        </span>
        <img className={classes.modalContent} src={props.src} alt={props.alt} />
        <span className={classes.caption}>{props?.alt}</span>
      </div>
    </>
  );
};
