import * as express from 'express'
import DB from '../../db/index';

import {CreateToken} from "../../utils/security/tokens";
import {HashPassword} from "../../utils/security/password";

const router = express.Router();

router.use('/' ,
    async (req: any, res, next) => {
        try{
            const user: any = await req.body;
            user.password = await HashPassword(req.body.password);
            let result: any = await DB.Users.Insert(user);
            let token: any;
            if(result) {
                token = await CreateToken({userid: parseInt(result.insertId)});
                result = await DB.Users.FindOneById(parseInt(result.insertId));
            }

            res.json( result ? {
                token,
                role: result.role,
                userid: result.userid
            } : {});
        }
        catch (e) {
            res.sendStatus(500);
            throw e;
        }
    });


export default router;