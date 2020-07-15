import * as express from 'express';
import chirpsRouter from './chirps';
import * as passport from 'passport';

const router = express.Router();

router.use((req,res,next) => {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
        if(user) req.user = user;
        return next();
    });
});

router.use('/chirps', chirpsRouter);

export default router;