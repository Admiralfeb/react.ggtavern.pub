import express from 'express';
import { MongoClient } from 'mongodb';

const username = encodeURIComponent(process.env.MONGOUSER as string);
const userpass = encodeURIComponent(process.env.MONGOPASS as string);
const connectionString = `mongodb+srv://${username}:${userpass}@cluster0.xup6s.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });


const router = express.Router();

router.get('/mongo/games', (_, res) => {
    getFromMongo('games')
        .then(response => res.json(response))
        .catch(_ => res.status(500));
});
router.get('/mongo/menu', (_, res) => {
    getFromMongo('menu')
        .then(response => res.json(response))
        .catch(_ => res.status(500));
});
router.get('/mongo/memoriam', (_, res) => {
    getFromMongo('memoriam')
        .then(response => res.json(response))
        .catch(_ => res.status(500));
});
router.get('/mongo/comics', (req, res) => {
    getFromMongo('comics', req.query)
        .then(response => res.json(response))
        .catch(_ => res.status(500));
});

const getFromMongo = async (collectionName: string, query?: any) => {
    try {
        await client.connect();

        const database = client.db('ggtavern');
        const collection = database.collection(collectionName);

        if (Object.keys(query).includes('index')) {
            query.index = parseInt(query.index);
        }
        const cursor = collection.find(query);
        const response = await cursor.toArray();

        return response;
    } catch (err) {
        console.error(err);
    }
}

export { router as mongoApi };
