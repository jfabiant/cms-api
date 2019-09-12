module.exports = {
    database: {
        connectionLimit: 350,
        host: process.env.HOST_DB,
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.DATABASE_DB,
        dateStrings: true,
        debug: false
    }
}