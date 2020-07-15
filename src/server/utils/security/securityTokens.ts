import * as crypto from 'crypto';
import * as jsonWebToken from 'jsonwebtoken';
import config from '../../config';
import DB from '../../db';

export const CreateToken = async (payload: IPayload) => {
    let tokenid: any = await DB.Tokens.insert(payload.userid);
    payload.Tokenid = tokenid.insertId;
    payload.unique = crypto.randomBytes(32).toString('hex');
    let token = await jsonWebToken.sign(payload.Tokenid, config.auth.secret);
    await DB.Tokens.update(token, payload.Tokenid);
    return token;
};

export const ValidToken = async ( token: string ) => {
    let payload: IPayload = <IPayload>jsonWebToken.decode(token);
    let [Tokenid] = await DB.Tokens.findOne(payload.Tokenid, token);
    if(!Tokenid) {
        throw new Error('Invalid Token!');
    } else {
        return payload;
    }
}

export interface IPayload {
    [key: string]: any;
    userid: number;
    unique?: string;
}