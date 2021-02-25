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

    // ROTAS DE USUÁRIO

    // CREATE
    app.post('/register', async function (request, response) {
        const { id, senha } = request.body

        if (id && senha) {
            const [rows] = await db.query(`SELECT * FROM usuario WHERE id_usuario = ?`, [id])
            if (!rows[0]) {
                const usuario = await db.execute(`INSERT INTO usuario (id_usuario,senha) VALUES (?, ?)`,
                    [
                        id,
                        senha
                    ])
                return response.status(200).json({ info: 'Usuário criado com sucesso' })
            }
            return response.status(400).json({ erro: 'ID em uso' })
        }
        return response.status(400).json({ erro: 'Campos inválidos' })
    })

    // AUTH
    app.post('/login', async (request, response) => {
        const { id, senha } = request.body
        const check = await db.query(`SELECT * FROM usuario WHERE id_usuario = ? AND senha = ?`, [
            id,
            senha
        ])
        if (id && senha) {
            if (check[0] != '') {
                console.log(check[0])
                return response.status(200).json({ auth: true })
            }
            return response.status(401).json({ erro: 'ID e/ou senha inválido(s)' })
        }
        return response.status(400).json({ erro: 'Campos inválidos' })
    })

    // ------------------------------------------------------------------------------------- //

    app.get('/usuario/:id_usuario', async function (request, response) {
        const id_usuario = request.params.nome
        const usuario = await db.query(`SELECT senha FROM usuario WHERE id_usuario = "${id_usuario}"`)
        response.json(usuario[0]);
    });

    app.get('/sinais/:id_bueiro', async function (request, response) {
        const [rows] = await db.execute("SELECT sin_dist FROM sinais WHERE id_bueiro = ? ORDER BY sin_id DESC LIMIT 1", [request.params.id_bueiro]);
        response.json(rows);
    });

    app.get('/sinais/:id', async function (request, response) {
        const [rows] = await db.execute("SELECT * FROM sinais WHERE sin_id = ?", [request.params.id]);
        response.json(rows);
    });

    app.get('/bueiro/:nome', async function (request, response) {
        const nome = request.params.nome
        const bueiro = await db.query(`SELECT latitude, longitude FROM bueiro WHERE nome = "${nome}"`)
        response.json(bueiro[0]);
    });

    app.get('/bueiro', async function (request, response) {
        const [rows] = await db.execute("SELECT id_bueiro as id, nome, latitude, longitude, id_usuario FROM bueiro");
        response.json(rows);
    });

    app.post('/bueiro', async function (request, response) {
        if (!request.body.nome || !request.body.latitude || !request.body.longitude || !request.body.id_usuario) {
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
            response.json({ "lastID": responseData[0].insertId });
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

    app.listen(3351, () => console.log("running..."));
}

init();