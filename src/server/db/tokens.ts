import { Query } from './index';

const findOne = async (id: number, token: string) => Query('SELECT * FROM tokens WHERE id = ? AND token = ?',[id,token]);

const insert = async (userid: number) => Query('INSERT INTO tokens (userid) VALUES(?)',[userid]);

const update = async (token: string, id: number) => Query('UPDATE tokens SET token = ? WHERE id = ?',[token,id]);


export default {
    findOne,
    insert,
    update
}