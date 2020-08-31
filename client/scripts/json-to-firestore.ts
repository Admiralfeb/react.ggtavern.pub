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

const mapping: { index: number, src: string, alt: string }[] = [
    { index: 0, src: "ggconst1.jpg", alt: "baby tavern 1" },
    { index: 1, src: "ggconst2.jpg", alt: "baby tavern 2" },
    { index: 2, src: "gg1.jpg", alt: "jack-in-the-box Thursday" },
    { index: 3, src: "gg2.jpg", alt: "grumpy" },
    { index: 4, src: "gg3.jpg", alt: "america's booze" },
    { index: 5, src: "gg4.jpg", alt: "Garrrrr" },
    { index: 6, src: "gg5.jpg", alt: "snap pop grin?" },
    { index: 7, src: "gg6.jpg", alt: "Thanos Rising" },
    { index: 8, src: "gg7.jpg", alt: "rubix consortium" },
    { index: 9, src: "gg8.jpg", alt: "rich is crazy" },
    { index: 10, src: "gg9.jpg", alt: "malort face" },
    { index: 11, src: "gg10.jpg", alt: "whiskey tasting" },
    { index: 12, src: "gg11.jpg", alt: "jen and a cider table" },
    { index: 13, src: "gg12.jpg", alt: "cider tasting" },
    { index: 14, src: "gg13.jpg", alt: "do you wanna build a snowman?" },
    { index: 15, src: "gg14.jpg", alt: "sorceror" },
    { index: 16, src: "gg19.jpg", alt: "for the horde.. in another life" },
    { index: 17, src: "gg20.jpg", alt: "goodbye for now" },
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
