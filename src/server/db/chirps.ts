import { Query } from './index';

const all = async () => Query('SELECT chirps.id,name,content,userid FROM users JOIN chirps ON chirps.userid = users.id');
const one = async (id: number) => Query("select chirps.id,users.name,chirps.content from users join chirps on chirps.userid = users.id where chirps.id = ?", [id]);
const edit = async (id: number,content: string) => Query("update chirps set content = ? WHERE id = ? ",[content,id]);
const oneUser = async (name: string) => Query("select users.id from users where users.name = ? ", [name]);
const addUser = async (name:string) => Query(" insert into users (name) values(?)", [name]);
const addChirp = async (id:number,content:string) => Query(" insert into chirps (content,userid) values(?,?)",[content,id]);
const deleteChirp = async (id:number) => Query(" delete from chirps where id = ? ",[id]);
const addMention = async (userId:number,chirpId:number) => Query("insert into mentions (userid,chirpid) values(?,?)",[userId,chirpId]);
const showMentions = async (userId:number) => Query("call spUserMentions(?)",[userId]);
export default {
    all,
    one,
    edit,
    oneUser,
    addUser,
    addChirp,
    deleteChirp,
    addMention,
    showMentions
}