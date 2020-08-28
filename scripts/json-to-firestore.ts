const dotenv = require('dotenv');
dotenv.config();

const firebase = require('firebase/app');
require('firebase/firestore');


// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: 'gg-tavern.firebaseapp.com',
    projectId: 'gg-tavern'
});

const db = firebase.firestore();

const mapping: { src: string, alt: string }[] = [
    { src: 'ggconst1.jpg', alt: 'baby tavern 1' },
    { src: 'ggconst2.jpg', alt: 'baby tavern 2' },
    { src: 'gg1.jpg', alt: 'jack-in-the-box Thursday' },
    { src: 'gg2.jpg', alt: 'grumpy' },
    { src: 'gg3.jpg', alt: 'america\'s booze' },
    { src: 'gg4.jpg', alt: 'Garrrrr' },
    { src: 'gg5.jpg', alt: 'snap pop grin?' },
    { src: 'gg6.jpg', alt: 'Thanos Rising' },
    { src: 'gg7.jpg', alt: 'rubix consortium' },
    { src: 'gg8.jpg', alt: 'rich is crazy' },
    { src: 'gg9.jpg', alt: 'malort face' },
    { src: 'gg10.jpg', alt: 'whiskey tasting' },
    { src: 'gg11.jpg', alt: 'jen and a cider table' },
    { src: 'gg12.jpg', alt: 'cider tasting' },
    { src: 'gg13.jpg', alt: 'do you wanna build a snowman?' },
    { src: 'gg14.jpg', alt: 'sorceror' },
    { src: 'gg19.jpg', alt: 'for the horde.. in another life' },
    { src: 'gg20.jpg', alt: 'goodbye for now' },
]

const uploadMap = () => {
    db.collection('memoriam').add({ imgMap: mapping })
        .then((doc: any) => {
            console.log('Document written with ID: ', doc.id);
        }).catch((error: any) => {
            console.error('Error adding document: ', error);
        });
}

uploadMap();
