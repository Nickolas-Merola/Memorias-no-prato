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