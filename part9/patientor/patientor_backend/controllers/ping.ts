import  { Router } from 'express';

const pingRouter = Router();

pingRouter.get('/', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

export default pingRouter;