import * as express from 'express';
const app = express();
const router = express.Router(),
 chirpsStore = require('./chirpstore');


router.get('/hello', (req, res, next) => {
    console.log("hello called here...");
    res.json('Rowan');
});

router.get('/:id?', (req, res) => {
    let id = req.params.id
    if(id) {
        res.json(chirpsStore.GetChirp(id));
    }
    else {
        res.send(chirpsStore.GetChirps());
    }
});

router.post('/', (req, res) => {
    chirpsStore.CreateChirp(req.body);
    res.sendStatus(200);
});

router.put('/:id?', (req, res) => {
    let id = req.params.id
    chirpsStore.UpdateChirp(id, req.body);
    res.sendStatus(200);
});

router.delete('/:id?', (req, res) => {
    let id = req.params.id
    chirpsStore.DeleteChirp(id);
    res.sendStatus(200);
});

export default router;