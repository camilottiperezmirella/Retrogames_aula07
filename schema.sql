CREATE DATABASE IF NOT EXISTS db_retrogames
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE db_retrogames;

CREATE TABLE IF NOT EXISTS jogos (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    plataforma VARCHAR(80) NOT NULL,
    desenvolvedora VARCHAR(120) NOT NULL,
    imagem_url VARCHAR(2048) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
);

INSERT INTO jogos (
    titulo,
    plataforma,
    desenvolvedora,
    imagem_url,
    preco
)
VALUES
(
    'Super Mario World',
    'Super Nintendo (SNES)',
    'Nintendo',
    'https://placehold.co/400x500/201c1a/ffffff?text=Super+Mario+World',
    149.90
),
(
    'Sonic the Hedgehog 2',
    'Mega Drive',
    'Sega',
    'https://placehold.co/400x500/201c1a/ffffff?text=Sonic+2',
    119.90
),
(
    'Crash Bandicoot',
    'PlayStation 1',
    'Naughty Dog',
    'https://placehold.co/400x500/201c1a/ffffff?text=Crash+Bandicoot',
    89.90
),
(
    'The Legend of Zelda: Ocarina of Time',
    'Nintendo 64',
    'Nintendo',
    'https://placehold.co/400x500/201c1a/ffffff?text=Zelda+Ocarina',
    199.90
);

