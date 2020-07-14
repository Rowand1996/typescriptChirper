import * as path from 'path';
import * as express from 'express';
import apiRouter from './routes';

const app = express();


app.use(express.json());


app.use('/api', apiRouter);
app.use(express.static('public'));


// let dataPath = path.join(__dirname, '../chirps.json');
// let personInfo = []

// fs.readFile(dataPath, 'utf8', (err, data) => {
//     if (err) throw err;
//     personInfo = JSON.parse(data);
//     console.log(personInfo);
//   });

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
