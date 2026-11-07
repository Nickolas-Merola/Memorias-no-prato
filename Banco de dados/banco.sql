CREATE DATABASE memorias;
USE memorias;

CREATE TABLE categoria (
    idCategoria INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE origem (
    idOrigem INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE pessoa (
    idPessoa INT PRIMARY KEY AUTO_INCREMENT,
    Apelido VARCHAR(50),
    relacao VARCHAR(50)
);

CREATE TABLE prato (
    idPrato INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    fkCategoria INT NOT NULL,
    fkOrigem INT NOT NULL,
    fkPessoa INT,
    dificuldade INT NOT NULL,                    
    tempoPreparo INT NOT NULL,
    notaPessoal INT NOT NULL,
    CONSTRAINT chkDificuldade CHECK (dificuldade IN(1,2,3,4,5)),
    CONSTRAINT chkNotaPessoal CHECK (notaPessoal IN(1,2,3,4,5)),
    FOREIGN KEY (fkCategoria) REFERENCES categoria(idCategoria),
    FOREIGN KEY (fkOrigem) REFERENCES origem(idOrigem),
    FOREIGN KEY (fkPessoa) REFERENCES pessoa(idPessoa)
);

CREATE TABLE ingrediente (
    idIngrediente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL UNIQUE,
    tipo VARCHAR(50)
);                                                  

CREATE TABLE prato_ingrediente (
    fkPrato INT,
    fkIngrediente INT,
    quantidade INT,
    PRIMARY KEY(fkPrato, fkIngrediente),           
    FOREIGN KEY (fkPrato) REFERENCES prato(idPrato),
    FOREIGN KEY (fkIngrediente) REFERENCES ingrediente(idIngrediente)
);

CREATE TABLE memoria (
    idMemoria INT PRIMARY KEY AUTO_INCREMENT,       
    fkPrato INT,
    titulo VARCHAR(50),
    descricao VARCHAR(255),                       
    ano YEAR,                                      
    FOREIGN KEY (fkPrato) REFERENCES prato(idPrato)
);

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    email VARCHAR(50) UNIQUE,                      
    senha VARCHAR(255),                             
    CONSTRAINT chkEmail CHECK (email LIKE '%@%')
);

-- =====================================================
-- DADOS DE TESTE (fictícios). Apagar depois, ver o final.
-- =====================================================

-- 1) Categorias e origens (IGNORE: não dá erro se já existirem)
INSERT IGNORE INTO categoria (nome) VALUES
('Churrasco'), ('Prato do dia'), ('Massas'), ('Doces'), ('Lanches'),
('Saladas'), ('Sopas e caldos'), ('Carnes'), ('Aves'),
('Peixes e frutos do mar'), ('Pães e salgados'), ('Acompanhamentos'),
('Molhos'), ('Bebidas'), ('Café da manhã e da tarde');

INSERT IGNORE INTO origem (nome) VALUES
('Brasil'), ('Argentina'), ('Uruguai'), ('Itália'), ('Portugal'),
('Espanha'), ('França'), ('Alemanha'), ('Estados Unidos'), ('México'),
('Peru'), ('Japão'), ('China'), ('Líbano'), ('Grécia');

-- 2) Pessoas (só apelidos, sem dados pessoais)
INSERT INTO pessoa (Apelido, relacao) VALUES
('Vó', 'Quem me ensinou a cozinhar'),
('Pai', 'Quem me apresentou o churrasco'),
('Mãe', 'Família'),
('Tia', 'Família'),
('Namorada', 'Companheira');

-- 3) Ingredientes
INSERT INTO ingrediente (nome, tipo) VALUES
('Sal', 'Tempero'), ('Alho', 'Tempero'), ('Cebola', 'Hortifruti'),
('Óleo', 'Gordura'), ('Pimenta-do-reino', 'Tempero'), ('Arroz', 'Grão'),
('Feijão', 'Grão'), ('Bife', 'Carne'), ('Batata', 'Hortifruti'),
('Picanha', 'Carne'), ('Costela', 'Carne'), ('Farinha de trigo', 'Farinha'),
('Ovo', 'Ovo'), ('Açúcar', 'Açúcar'), ('Leite', 'Laticínio'),
('Leite condensado', 'Laticínio'), ('Manteiga', 'Laticínio'),
('Fermento', 'Fermentação'), ('Macarrão', 'Massa'), ('Tomate', 'Hortifruti'),
('Molho de tomate', 'Molho'), ('Queijo parmesão', 'Laticínio'),
('Bacon', 'Carne'), ('Linguiça', 'Carne'), ('Pão francês', 'Padaria'),
('Queijo provolone', 'Laticínio'), ('Peito de frango', 'Carne'),
('Creme de leite', 'Laticínio'), ('Cenoura', 'Hortifruti'),
('Salsinha', 'Tempero'), ('Orégano', 'Tempero');

-- 4) Pratos (a pessoa NULL testa o LEFT JOIN)
INSERT INTO prato (nome, fkCategoria, fkOrigem, fkPessoa, dificuldade, tempoPreparo, notaPessoal)
SELECT v.nome, c.idCategoria, o.idOrigem, pe.idPessoa, v.dif, v.tempo, v.nota
FROM (
    SELECT 'Arroz e feijão' AS nome, 'Prato do dia' AS cat, 'Brasil' AS ori, 'Vó' AS pes, 1 AS dif, 40 AS tempo, 5 AS nota
    UNION ALL SELECT 'Bife com batata frita', 'Prato do dia', 'Brasil', 'Vó', 2, 35, 4
    UNION ALL SELECT 'Picanha na brasa', 'Churrasco', 'Brasil', 'Pai', 3, 90, 5
    UNION ALL SELECT 'Bolo do café da tarde', 'Doces', 'Brasil', 'Vó', 2, 60, 4
    UNION ALL SELECT 'Macarrão ao molho', 'Massas', 'Itália', 'Mãe', 2, 30, 4
    UNION ALL SELECT 'Pudim de leite', 'Doces', 'Brasil', 'Tia', 3, 120, 5
    UNION ALL SELECT 'Choripán', 'Lanches', 'Argentina', NULL, 2, 25, 4
    UNION ALL SELECT 'Provoleta', 'Acompanhamentos', 'Argentina', NULL, 2, 20, 4
    UNION ALL SELECT 'Costela no fogo de chão', 'Churrasco', 'Brasil', 'Pai', 4, 360, 5
    UNION ALL SELECT 'Salada de tomate e cebola', 'Saladas', 'Brasil', 'Mãe', 1, 10, 3
    UNION ALL SELECT 'Lasanha', 'Massas', 'Itália', 'Namorada', 4, 90, 5
    UNION ALL SELECT 'Strogonoff de frango', 'Prato do dia', 'Brasil', 'Tia', 2, 45, 4
    UNION ALL SELECT 'Carbonara', 'Massas', 'Itália', 'Namorada', 3, 30, 5
    UNION ALL SELECT 'Sopa de legumes', 'Sopas e caldos', 'Brasil', 'Vó', 1, 50, 3
) v
JOIN categoria c ON c.nome = v.cat
JOIN origem o ON o.nome = v.ori
LEFT JOIN pessoa pe ON pe.Apelido = v.pes;

-- 5) Ingredientes de cada prato (quantidade: número livre, sem unidade)
INSERT INTO prato_ingrediente (fkPrato, fkIngrediente, quantidade)
SELECT p.idPrato, i.idIngrediente, v.qtd
FROM (
    SELECT 'Arroz e feijão' AS prato, 'Arroz' AS ing, 200 AS qtd
    UNION ALL SELECT 'Arroz e feijão', 'Feijão', 150
    UNION ALL SELECT 'Arroz e feijão', 'Alho', 3
    UNION ALL SELECT 'Arroz e feijão', 'Cebola', 1
    UNION ALL SELECT 'Arroz e feijão', 'Sal', 5
    UNION ALL SELECT 'Arroz e feijão', 'Óleo', 15

    UNION ALL SELECT 'Bife com batata frita', 'Bife', 300
    UNION ALL SELECT 'Bife com batata frita', 'Batata', 400
    UNION ALL SELECT 'Bife com batata frita', 'Cebola', 1
    UNION ALL SELECT 'Bife com batata frita', 'Alho', 2
    UNION ALL SELECT 'Bife com batata frita', 'Sal', 5
    UNION ALL SELECT 'Bife com batata frita', 'Óleo', 200
    UNION ALL SELECT 'Bife com batata frita', 'Pimenta-do-reino', 2

    UNION ALL SELECT 'Picanha na brasa', 'Picanha', 1000
    UNION ALL SELECT 'Picanha na brasa', 'Sal', 20

    UNION ALL SELECT 'Bolo do café da tarde', 'Farinha de trigo', 300
    UNION ALL SELECT 'Bolo do café da tarde', 'Ovo', 3
    UNION ALL SELECT 'Bolo do café da tarde', 'Açúcar', 200
    UNION ALL SELECT 'Bolo do café da tarde', 'Leite', 200
    UNION ALL SELECT 'Bolo do café da tarde', 'Óleo', 100
    UNION ALL SELECT 'Bolo do café da tarde', 'Fermento', 10
    UNION ALL SELECT 'Bolo do café da tarde', 'Sal', 1

    UNION ALL SELECT 'Macarrão ao molho', 'Macarrão', 500
    UNION ALL SELECT 'Macarrão ao molho', 'Molho de tomate', 300
    UNION ALL SELECT 'Macarrão ao molho', 'Alho', 2
    UNION ALL SELECT 'Macarrão ao molho', 'Cebola', 1
    UNION ALL SELECT 'Macarrão ao molho', 'Sal', 5
    UNION ALL SELECT 'Macarrão ao molho', 'Óleo', 20
    UNION ALL SELECT 'Macarrão ao molho', 'Orégano', 2
    UNION ALL SELECT 'Macarrão ao molho', 'Queijo parmesão', 50

    UNION ALL SELECT 'Pudim de leite', 'Leite condensado', 395
    UNION ALL SELECT 'Pudim de leite', 'Leite', 500
    UNION ALL SELECT 'Pudim de leite', 'Ovo', 3
    UNION ALL SELECT 'Pudim de leite', 'Açúcar', 150

    UNION ALL SELECT 'Choripán', 'Linguiça', 4
    UNION ALL SELECT 'Choripán', 'Pão francês', 4
    UNION ALL SELECT 'Choripán', 'Alho', 2
    UNION ALL SELECT 'Choripán', 'Sal', 3
    UNION ALL SELECT 'Choripán', 'Salsinha', 5
    UNION ALL SELECT 'Choripán', 'Orégano', 2
    UNION ALL SELECT 'Choripán', 'Óleo', 10

    UNION ALL SELECT 'Provoleta', 'Queijo provolone', 300
    UNION ALL SELECT 'Provoleta', 'Orégano', 2
    UNION ALL SELECT 'Provoleta', 'Pimenta-do-reino', 1

    UNION ALL SELECT 'Costela no fogo de chão', 'Costela', 3000
    UNION ALL SELECT 'Costela no fogo de chão', 'Sal', 60
    UNION ALL SELECT 'Costela no fogo de chão', 'Pimenta-do-reino', 5

    UNION ALL SELECT 'Salada de tomate e cebola', 'Tomate', 4
    UNION ALL SELECT 'Salada de tomate e cebola', 'Cebola', 2
    UNION ALL SELECT 'Salada de tomate e cebola', 'Sal', 3
    UNION ALL SELECT 'Salada de tomate e cebola', 'Óleo', 30
    UNION ALL SELECT 'Salada de tomate e cebola', 'Orégano', 1

    UNION ALL SELECT 'Lasanha', 'Macarrão', 500
    UNION ALL SELECT 'Lasanha', 'Molho de tomate', 500
    UNION ALL SELECT 'Lasanha', 'Queijo parmesão', 100
    UNION ALL SELECT 'Lasanha', 'Creme de leite', 200
    UNION ALL SELECT 'Lasanha', 'Cebola', 1
    UNION ALL SELECT 'Lasanha', 'Alho', 3
    UNION ALL SELECT 'Lasanha', 'Sal', 8
    UNION ALL SELECT 'Lasanha', 'Óleo', 20
    UNION ALL SELECT 'Lasanha', 'Manteiga', 30

    UNION ALL SELECT 'Strogonoff de frango', 'Peito de frango', 600
    UNION ALL SELECT 'Strogonoff de frango', 'Creme de leite', 200
    UNION ALL SELECT 'Strogonoff de frango', 'Cebola', 1
    UNION ALL SELECT 'Strogonoff de frango', 'Alho', 3
    UNION ALL SELECT 'Strogonoff de frango', 'Sal', 6
    UNION ALL SELECT 'Strogonoff de frango', 'Óleo', 20
    UNION ALL SELECT 'Strogonoff de frango', 'Manteiga', 20
    UNION ALL SELECT 'Strogonoff de frango', 'Molho de tomate', 100

    UNION ALL SELECT 'Carbonara', 'Macarrão', 400
    UNION ALL SELECT 'Carbonara', 'Ovo', 4
    UNION ALL SELECT 'Carbonara', 'Bacon', 150
    UNION ALL SELECT 'Carbonara', 'Queijo parmesão', 80
    UNION ALL SELECT 'Carbonara', 'Pimenta-do-reino', 3
    UNION ALL SELECT 'Carbonara', 'Sal', 5

    UNION ALL SELECT 'Sopa de legumes', 'Batata', 300
    UNION ALL SELECT 'Sopa de legumes', 'Cenoura', 200
    UNION ALL SELECT 'Sopa de legumes', 'Cebola', 1
    UNION ALL SELECT 'Sopa de legumes', 'Alho', 2
    UNION ALL SELECT 'Sopa de legumes', 'Sal', 6
    UNION ALL SELECT 'Sopa de legumes', 'Óleo', 15
    UNION ALL SELECT 'Sopa de legumes', 'Salsinha', 5
) v
JOIN prato p ON p.nome = v.prato
JOIN ingrediente i ON i.nome = v.ing;

-- 6) Memórias (alguns pratos ficam sem memória de propósito)
INSERT INTO memoria (fkPrato, titulo, descricao, ano)
SELECT p.idPrato, v.titulo, v.descricao, v.ano
FROM (
    SELECT 'Arroz e feijão' AS prato, 'O cheiro do almoço' AS titulo,
           'Chegar da escola e sentir o cheiro da comida sendo feita. Eu contava os segundos para poder comer.' AS descricao, 2010 AS ano
    UNION ALL SELECT 'Bolo do café da tarde', 'O primeiro bolo',
           'A primeira vez que ajudei a fazer o bolo do café da tarde, com um avental grande demais para mim.', 2011
    UNION ALL SELECT 'Bife com batata frita', 'Almoço de domingo',
           'Um prato simples que deixava o almoço em casa uma alegria.', 2012
    UNION ALL SELECT 'Macarrão ao molho', 'Domingo de macarrão',
           'Mesa cheia de gente e uma travessa que nunca chegava ao fim.', 2015
    UNION ALL SELECT 'Picanha na brasa', 'Meu primeiro churrasco',
           'O dia em que vi o churrasco de perto pela primeira vez, ao lado do meu pai.', 2014
    UNION ALL SELECT 'Picanha na brasa', 'O ponto da carne',
           'Aprendi a olhar a brasa e a respeitar o tempo da carne.', 2018
    UNION ALL SELECT 'Costela no fogo de chão', 'Um dia inteiro de fogo',
           'Acordamos cedo para acender o fogo e passamos o dia cuidando da costela.', 2019
    UNION ALL SELECT 'Pudim de leite', 'O pudim da festa',
           'Pudim feito para o aniversário da família, que acabou antes da hora do parabéns.', 2016
    UNION ALL SELECT 'Sopa de legumes', 'Sopa em dia de frio',
           'A sopa que aquecia a casa nas noites mais frias do ano.', 2017
    UNION ALL SELECT 'Lasanha', 'Lasanha de aniversário',
           'A primeira lasanha que fiz sozinho, em camadas que quase não fecharam.', 2022
    UNION ALL SELECT 'Choripán', 'O choripán da parrilla',
           'O lanche que virou o favorito depois de uma tarde na parrilla.', 2023
    UNION ALL SELECT 'Carbonara', 'A primeira carbonara',
           'Fiz a receita sem creme de leite pela primeira vez e deu certo.', 2024
) v
JOIN prato p ON p.nome = v.prato;

-- 7) Usuário de teste para login (senha em texto puro só para teste)
INSERT INTO usuario (nome, email, senha) VALUES
('Usuário Teste', 'teste@teste.com', 'teste123');

-- 8) Conferir
SELECT 'categoria' AS tabela, COUNT(*) AS total FROM categoria
UNION ALL SELECT 'origem', COUNT(*) FROM origem
UNION ALL SELECT 'pessoa', COUNT(*) FROM pessoa
UNION ALL SELECT 'ingrediente', COUNT(*) FROM ingrediente
UNION ALL SELECT 'prato', COUNT(*) FROM prato
UNION ALL SELECT 'prato_ingrediente', COUNT(*) FROM prato_ingrediente
UNION ALL SELECT 'memoria', COUNT(*) FROM memoria
UNION ALL SELECT 'usuario', COUNT(*) FROM usuario;

-- Confere o resultado
SELECT * FROM categoria;
SELECT * FROM origem;