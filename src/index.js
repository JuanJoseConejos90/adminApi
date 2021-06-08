import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/router';
import config from './db/db.config';
import cors from 'cors';

const app = express();
const port = process.env.PORT || config.PORT;

app.get('/', function (req, res) {
    res.status(200).send("<h1>API</h1>");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

