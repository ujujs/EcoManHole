CREATE TABLE usuario (
id_usuario INTEGER,
senha VARCHAR(255)NOT NULL,
PRIMARY KEY(id_usuario)
);


CREATE TABLE bueiro (
id_bueiro INTEGER AUTO_INCREMENT,
id_usuario INTEGER NOT NULL,
nome VARCHAR(255) NOT NULL,
latitude DECIMAL(25) NOT NULL,
longitude DECIMAL(25) NOT NULL,
PRIMARY KEY(id_bueiro),
FOREIGN KEY(id_usuario) REFERENCES usuario (id_usuario)
);


CREATE TABLE sinais (
sin_id INTEGER AUTO_INCREMENT,
id_bueiro INTEGER NOT NULL,
sin_dist LONG NOT NULL,
sin_data DATETIME NOT NULL,
PRIMARY KEY(sin_id),
FOREIGN KEY(id_bueiro) REFERENCES bueiro (id_bueiro)
);