import * as express from 'express';
import DB from '../../db';
import { RequestHandler } from 'express';

const router = express.Router();

// const isLoggedIn: RequestHandler = (req, res, next) => {
//     if(!req.user || req.user.role !== 'admin') {
//         return res.sendStatus(401);
//     } else {
//         return next();
//     }
// }

router.get('/:id?', async (req, res) => {
    res.send("smdkmaksl");
    // try {
    //     let id = parseInt(req.params.id);

    //     if (id) {
    //         res.json(await DB.Chirps.one(id));
    //     }
    //     else {
    //         //res.json(await DB.Chirps.all());
    //     }
    // } catch (e) {
    //     console.log(e);
    //     res.sendStatus(500);
    // }
});

router.get('/mentions/:id', async (req, res) => {

    try {
        let id = parseInt(req.params.id);
        console.log(id);
        let dbResponse = await DB.Chirps.showMentions(id);
        res.send(dbResponse[0]);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {

    try {
        let name = req.body.name;
        let content = req.body.content;
        let position = content.search("@");
        if (position > 0) {
            let startOfName = content.substring(position + 1, content.length);
            let secondPosition = startOfName.search(" ");
            let mentionName = content.substring(position + 1, secondPosition + position + 1);
            await DB.Chirps.oneUser(name).then((results) => {
                let id = results[0].id;
                if (results.length > 0) {
                    console.log(results);
                    DB.Chirps.addChirp(id, content).then((result) => {
                        console.log(result);
                        let chirpId = result.insertId;
                        console.log(chirpId);
                        DB.Chirps.oneUser(mentionName).then((res) => {
                            let userId = res[0].id;
                            DB.Chirps.addMention(userId, chirpId);
                        });
                    });

                }
            });

        } else {
            await DB.Chirps.oneUser(name).then((results) => {
                //check to see if user exists
                if (results.length > 0) {
                    //user exists so add chirp using users id
                    DB.Chirps.addChirp(results[0].id, content);
                    res.sendStatus(200);
                }
                else {
                    //user didnt exist so create user 
                    DB.Chirps.addUser(name).then(() => {
                        //retrieve new user to get id 
                        DB.Chirps.oneUser(name).then((results) => {
                            // with users id add a chirp with input content
                            DB.Chirps.addChirp(results[0].id, content);
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

router.put('/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let content = req.body.content;

        await DB.Chirps.edit(id, content);
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/:id?', async (req, res) => {

    try {
        let id = parseInt(req.params.id);

        await DB.Chirps.deleteChirp(id);
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;