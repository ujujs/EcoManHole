"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
var mysql = require('mysql2');
async function init() {
    // get the client
    const mysql = require('mysql2/promise');
    // create the connection
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'exemplo' });
    return connection;
}
exports.init = init;
//# sourceMappingURL=database.js.map