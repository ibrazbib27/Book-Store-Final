import * as express from 'express';


import apiRoute from './api';
import authRoute from './auth';

const router = express.Router();



router.use('/api', apiRoute);
router.use('/auth', authRoute);


export default router;