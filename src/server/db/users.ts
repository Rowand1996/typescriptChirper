import { Query } from './index';

const findOneByEmail = async (email:string) => Query('SELECT * FROM users WHERE email = ?',[email]);

const findOneById = async (id: number) => Query('SELECT * FROM users WHERE id = ?',[id]);

const insert = async (user: any) => Query('INSERT INTO users (email,name,password) VALUES ?', user);

export default {
    findOneByEmail,
    findOneById,
    insert
}