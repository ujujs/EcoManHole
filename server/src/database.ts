var mysql = require('mysql2');

export async function init() {
    // get the client
    const mysql = require('mysql2/promise');
    // create the connection
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'exemplo' });
    return connection
}