import express from 'express';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = express.Router();

const staticFiles = express.static(path.join(__dirname, "../../client/build"))
app.use(staticFiles);

router.get('/games', (req, res) => {
    const response = [
        { id: 1, name: 'Command and Conquer' },
        { id: 2, name: 'Star Trek Armada 2' },
        { id: 3, name: 'Elite Dangerous' },
    ];

    res.json(response);
});

app.use(router);

app.use('/*', staticFiles);

app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('port')}`);
})
