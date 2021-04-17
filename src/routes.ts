import { Router } from 'express';
import userApi from './api/user'
import auth from './api/auth'
import monitor from './api/monitor'

const routes = Router();
routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World connect to api' });
});

routes.use('/v1', userApi);
routes.use('/v1', auth);
routes.use('/v1', monitor);

export default routes;
