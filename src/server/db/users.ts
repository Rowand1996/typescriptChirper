import { Query } from './index';

const findOneByEmail = async (email:string) => Query('SELECT * FROM users WHERE email = ?',[email]);

const findOneById = async (id: number) => Query('SELECT * FROM users WHERE id = ?',[id]);


export default {
    findOneByEmail,
    findOneById
}