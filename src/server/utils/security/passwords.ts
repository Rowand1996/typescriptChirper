import * as bcrypt from 'bcrypt';

export const HashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const has = bcrypt.hashSync(password, salt);
    return bcrypt.hash;
};

export const ComparePassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
}; 