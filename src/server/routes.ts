import * as express from 'express';
import db from './db';
const app = express();
const router = express.Router();



router.get('/chirps/:id?', async (req, res) => {

    try {
        let id = parseInt(req.params.id);

        if (id) {
            res.json(await db.Chirps.one(id));
        }
        else {
            res.json(await db.Chirps.all());
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/chirps', async (req, res) => {

    try {
        let name = req.body.name;
        let content = req.body.content;
        let position = content.search("@");
        if(position > 0){
            let startOfName = content.substring(position +1,content.length);
            let secondPosition = startOfName.search(" ");
            let mentionName = content.substring(position + 1,secondPosition + position + 1);
            await db.Chirps.oneUser(name).then((results) => {
            let id = results[0].id;
            if (results.length > 0) {
                console.log(results);
                db.Chirps.addChirp(id, content).then((result) => {
                    console.log(result);
                    let chirpId = result.insertId;
                    console.log(chirpId);
                        db.Chirps.oneUser(mentionName).then((res) => {
                            let userId = res[0].id;
                            db.Chirps.addMention(userId,chirpId);
                        });
                    });

                }
            });

        } else {
            await db.Chirps.oneUser(name).then((results) => {
                //check to see if user exists
                if (results.length > 0) {
                    //user exists so add chirp using users id
                    db.Chirps.addChirp(results[0].id, content);
                    res.sendStatus(200);
                }
                else {
                    //user didnt exist so create user 
                    db.Chirps.addUser(name).then(() => {
                        //retrieve new user to get id 
                        db.Chirps.oneUser(name).then((results) => {
                            // with users id add a chirp with input content
                            db.Chirps.addChirp(results[0].id, content);
                            res.sendStatus(200);
                        });
                    });
                }
            });
        }
        
        
        

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/chirps/:id', async (req, res) => {

    try {
        let id = parseInt(req.params.id);
        let content = req.body.content;

        await db.Chirps.edit(id, content);
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/chirps/:id?', async (req, res) => {

    try {
        let id = parseInt(req.params.id);
        await db.Chirps.deleteChirp(id);
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;