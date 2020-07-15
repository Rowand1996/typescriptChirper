export default {
    mysql: {
        connectionLimit: 10,
        host: process.env.DB_HOST,
        port:3306,
        user: process.env.DB_USER,
        password: process.env.BD_PASS,
        database: process.env.DB_SCHEMA
    },
    auth: {
        secret: process.env.SECRET
    }
}