import * as Realm from 'realm-web';

const appId = 'ggtavern-qfjmc';
const appConfig = {
    id: appId,
    timeout: 10000,
};

export const getDatafromtheRealm = async <T>(collection: string): Promise<T[]> => {
    let user;
    try {
        const app = new Realm.App(appConfig);

        if (!app.currentUser) {
            user = await app.logIn(Realm.Credentials.anonymous());
        }

        const mongo = app.services.mongodb("mongodb-atlas");
        const mongoCollection = mongo.db("ggtavern").collection(collection);
        const documentsFound = await mongoCollection.find();
        console.log(documentsFound);

        const convertedData = documentsFound as unknown as T[];

        return convertedData;

    } finally {
        if (user) {
            user.logOut();
        }
    }
}
