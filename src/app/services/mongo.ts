import { MongoClient } from 'mongodb';

const username = encodeURIComponent(process.env.REACT_APP_MONGO_READ_USERID as string);
const userpass = encodeURIComponent(process.env.REACT_APP_MONGO_READ_USERPASS as string);
// const uri = `mongodb+srv://${username}:${userpass}@cluster0.xup6s.mongodb.net/database?w=majority`;
const uri = `mongodb://localhost/ggtavern`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export const getItemsfromMongo = async <T>(collection: string): Promise<T[]> => {
    try {

        console.log(client);
        try {
            await client.connect();
            console.log(client);
        } catch (error) {
            console.error('Failed to connect to MongoDB server');
            throw error;
        }

        const mongoCollection = client.db("database").collection<T>(collection);
        const cursor = mongoCollection.find()
        const items = await cursor.toArray();

        console.log(items);

        await client.close();

        return items;
    } catch (err) {
        console.error(err);
        return [];
    }
}
