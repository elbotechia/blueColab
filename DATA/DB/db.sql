-- Active: 1755252526123@@127.0.0.1@3306
CREATE TABLE Pessoas (
    idPessoa INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    nome_referencial TEXT NOT NULL,
    tipo TEXT DEFAULT 'PF',
    role TEXT DEFAULT 'USER',
    username TEXT NOT NULL UNIQUE,
    email_institucional TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    location TEXT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);


INSERT INTO Pessoas (nome_referencial, tipo, role, username, email_institucional, password_hash)
VALUES ('ÉRIK LUÍS MENDONÇA BOTECHIA DE JESUS LEITE', 'PF', 'ADMIN', 'elbotechia', '24.019050-4@maua.br', '$2y$12$ag10/IoZGKgJwFsilKQUz.bU.xlZx46SeGg1j5KPpmE9XJRaTv/mu');
-- sebga defaykt é CPF IY CNPJ COM PONTOS E TRAÇOS

SELECT * FROM Pessoas;
DROP TABLE Pessoas;

CREATE TABLE Item (
 idItem INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
 tag VARCHAR(60) NOT NULL UNIQUE,
 location VARCHAR(260) NULL,
created_at TEXT DEFAULT (datetime('now')),
updated_at TEXT DEFAULT (datetime('now'))
);

SELECT * FROM Item;