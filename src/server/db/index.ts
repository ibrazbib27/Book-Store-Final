import * as mysql from 'mysql';
import development from '../config';

import AccessTokens from './queries/accesstokens';
import Books from './queries/books';
import User from './queries/users';



export const Connection = mysql.createPool(development.mysql);

Connection.getConnection((err, connection) => {
    if(err) return connection.end();
});

export default {
    AccessTokens,
    Books,
    Users
};