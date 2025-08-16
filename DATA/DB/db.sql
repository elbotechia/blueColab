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

CREATE TABLE Empresa(
    idEmpresa INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    location VARCHAR(260) NULL,
    nome_fantasia TEXT NOT NULL,
    razao_social TEXT NOT NULL,
    dominio_principal TEXT NOT NULL DEFAULT "EDUCACIONAL",
    CNPJ TEXT NOT NULL UNIQUE,
    matriz_ou_filial TEXT NOT NULL DEFAULT "MATRIZ",
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    idPessoa_Pessoa INTEGER NOT NULL,
    FOREIGN KEY (idPessoa_Pessoa) REFERENCES Pessoas (idPessoa)
    ON UPDATE CASCADE ON DELETE CASCADE
);

SELECT * FROM "Empresa";
DROP TABLE "Account";
CREATE TABLE Account (
    idAccount INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    idPessoa_Pessoa INTEGER NOT NULL,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    location TEXT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (idPessoa_Pessoa) REFERENCES Pessoas (idPessoa)
    ON UPDATE CASCADE ON DELETE CASCADE
);

SELECT * FROM Account;

INSERT INTO "Account" ("idPessoa_Pessoa", username, email)
VALUES (1, 'elbotechia', '24.01905-4@maua.br');
SELECT
    pessoa.idPessoa,
    pessoa.email_institucional,
    pessoa.username,
    Account.idAccount,
    Account.location
FROM Pessoas AS pessoa
INNER JOIN Account ON Account."idPessoa_Pessoa" = pessoa.idPessoa;


CREATE TABLE Ticket (
    idTicket INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    idOperador INTEGER NOT NULL,
    idRequisitante INTEGER NOT NULL,
    idItem_Item INTEGER NOT NULL,
    location TEXT NULL,
    tipo_operacao TEXT NOT NULL,
    status TEXT DEFAULT 'TODO',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (idOperador) REFERENCES Pessoas (idPessoa)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (idRequisitante) REFERENCES Pessoas (idPessoa)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (idItem_Item) REFERENCES Item (idItem)
    ON UPDATE CASCADE ON DELETE CASCADE
);

SELECT * FROM "Ticket";

CREATE TABLE Task(
    idTask INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    status TEXT DEFAULT 'TODO',
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    location TEXT NULL,
    responsable INTEGER NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (responsable) REFERENCES Pessoas (idPessoa)
    ON UPDATE CASCADE ON DELETE CASCADE
 );

DROP TABLE TASK;
 select * from Task;