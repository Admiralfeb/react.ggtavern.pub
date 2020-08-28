import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { ID } from 'app/models/id.model';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: 'gg-tavern.firebaseapp.com',
    projectId: 'gg-tavern',
    databaseURL: 'https://gg-tavern.firebaseio.com',
    storageBucket: 'gg-tavern.appspot.com',
    messagingSenderId: '770177405846',
    appId: '1:770177405846:web:e3b9b6dcc4b1808be3c3b7',
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const loginAnon = async (): Promise<firebase.auth.UserCredential> => {
    const value = await firebase.auth().signInAnonymously();
    return value;
}

/**
 * Gets all documents' data on the path specified. Does not retrieve sub-collections.
 * @param queryPath document path for location to query
 */
export const getItemsfromFirestore = async <T>(queryPath: string): Promise<T[]> => {
    let items: T[] = [];
    try {
        const collection = await db.collection(queryPath).get();
        if (!collection.empty) {
            for (const item of collection.docs) {
                const data = item.data() as T;
                items = [...items, data];
            }
        }
        return items;
    } catch (err) {
        throw err;
    }
}

/**
 * Gets all documents' data on the path specified. Does not retrieve sub-collections.
 * @param queryPath document path for location to query
 */
export const getItemswithIDfromFirestore = async <T extends ID>(queryPath: string): Promise<T[]> => {
    let items: T[] = [];
    try {
        const collection = await db.collection(queryPath).get();
        if (!collection.empty) {
            for (const item of collection.docs) {
                const data = item.data() as T;
                data.id = item.id;
                items = [...items, data];
            }
        }
        return items;
    } catch (err) {
        throw err;
    }
}
