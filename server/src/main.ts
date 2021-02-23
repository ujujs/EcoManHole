// select <sin_id from sinais where id_bueiro = button.id

// <button> id.bueiro ---> nome
// <button>38 b1</button>


import { init as initDatabase } from "./database";
import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.json());

async function init() {
    const db = await initDatabase();

    app.get('/bueiro/:nome', async function (request, response) {
        const nome = request.params.nome
        const bueiro = await db.query(`SELECT latitude, longitude FROM bueiro WHERE nome = "${nome}"`)
        response.json(bueiro[0]);
    });

    app.get('/bueiro', async function (request, response) {
        const [rows] = await db.execute("SELECT * FROM bueiro");
        response.json(rows);
    });

    app.get('/sinais/:id', async function (request, response) {
        const [rows] = await db.execute("SELECT * FROM sinais WHERE sin_id = ?", [request.params.id]);
        response.json(rows);
    });

    app.get('/bueiro', async function (request, response) {
        const responseData = await db.query("SELECT id_bueiro as id, nome, latitude, longitude, id_usuario FROM bueiro");
        response.json(responseData);
        // response.status(201);
    });

    app.post('/bueiro', async function (request, response) {
        if (!request.body.nome || !request.body.latitude || !request.body.longitude || !request.body.id_usuario ) {
            response.json({ error: "dados incompletos." });
            return;
        }

        try {
            const responseData = await db.query(
                "INSERT INTO bueiro(nome, latitude, longitude, id_usuario) VALUES(?, ?, ?, ?)",
                [
                    request.body.nome,
                    request.body.latitude,
                    request.body.longitude,
                    request.body.id_usuario
                ]
            );
            response.json({"lastID": responseData[0].insertId});
        } catch (e) {
            response.json({ error: "database error", detail: e });
        }
    });

    app.get('/bueiro/:id', async function (request, response) {
        const responseData = await db.get("SELECT * FROM bueiro WHERE id_bueiro=? LIMIT 1", request.params.id);

        if (responseData == undefined) {
            response.json({ error: "Bueiro não encontrada." });
        } else {
            response.json(responseData);
        }
    });

    app.put('/bueiro/:id', async function (request, response) {
        if (!request.body.nome || !request.body.latitude || !request.body.longitude || !request.body.id_usuario) {
            response.json({ error: "dados incompletos." });
            return;
        }

        try {
            const responseData = await db.execute(
                "UPDATE bueiro SET nome=?, latitude=?, longitude=?, id_usuario=? WHERE id_bueiro=?",
                [
                    request.body.nome,
                    request.body.latitude,
                    request.body.longitude,
                    request.body.id_usuario,
                    request.params.id
                ]
            );

            if (responseData == undefined) {
                response.json({ error: "Bueiro não encontrada." });
            } else {
                response.json(responseData);
            }
        } catch (e) {
            response.json({ error: "database error", detail: e });
        }
    });

    app.delete('/bueiro/:id', async function (request, response) {
        const responseData = await db.execute("DELETE FROM bueiro WHERE id_bueiro=?", [request.params.id]);
        if (responseData.changes == 0) {
            response.json({ error: "Bueiro não encontrada." });
        } else {
            response.json(responseData);
        }
    });

    app.listen(3333, () => console.log("running..."));
}

init();