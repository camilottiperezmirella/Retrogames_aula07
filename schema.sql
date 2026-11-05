-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS db_retro_games;
USE db_retro_games;

-- Criar a tabela de discos
CREATE TABLE IF NOT EXISTS jogos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    imagem_url TEXT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO jogos (nome, autor, genero, imagem_url, preco) VALUES
('Super Mario Bro', 'Alguém aí', 'Aventura', 'https://th.bing.com/th/id/OIP.Uug7qQ7XyaM9Rwdb81P9YwHaEK?w=267&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', 100.00),
('Sonic', 'Algum japonês', 'Avetura', 'https://th.bing.com/th/id/OIP.xW5pZGoDGbu8jK1bvRki9AHaEK?w=281&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', 200.50),
('Pac-man', 'Alguem', 'Aventura', 'https://img.okezone.com/content/2023/02/20/326/2768266/sejarah-penciptaan-game-legendaris-pac-man-10aXQ8DlD0.jpg', 150.00);
