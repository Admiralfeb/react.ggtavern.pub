import express from 'express';
import { MongoClient } from 'mongodb';

const username = encodeURIComponent(process.env.MONGOUSER as string);
const userpass = encodeURIComponent(process.env.MONGOPASS as string);
const connectionString = `mongodb+srv://${username}:${userpass}@cluster0.xup6s.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });


const router = express.Router();

router.get('/mongo/games', (_, res) => {
    console.log(connectionString);
    getFromMongo('games')
        .then(response => res.json(response))
        .catch(_ => res.status(500));
});
router.get('/mongo/menu', (_, res) => {
    console.log(connectionString);
    getFromMongo('menu')
        .then(response => res.json(response))
        .catch(_ => res.status(500));
});
router.get('/mongo/memoriam', (_, res) => {
    console.log(connectionString);
    getFromMongo('memoriam')
        .then(response => res.json(response))
        .catch(_ => res.status(500));
});

const getFromMongo = async (collectionName: string) => {
    try {
        await client.connect();

        const database = client.db('ggtavern');
        const collection = database.collection(collectionName);

        const cursor = collection.find();
        const response = await cursor.toArray();

        return response;
    } catch (err) {
        console.error(err);
    }
}

export { router as mongoApi };
