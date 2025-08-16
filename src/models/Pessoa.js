import { handlePassword } from "../utils/handlePassword.js";
import { dbUtils } from "../config/database.js";

export class Pessoa {
    constructor(nome_referencial, username, tipo = "PF", role = "USER", email_institucional, password, location = null) {
        this.nomeReferencial = nome_referencial;
        this.username = username;
        this.tipo = tipo;
        this.email_institucional = email_institucional;
        this.role = role;
        this.location = location;
        this.password = password;
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    async toDBModel() {
        try {
            // Hash da senha usando a função utilitária
            const passwordHash = await handlePassword.encrypt(this.password);
            
            return {
                nome_referencial: this.nomeReferencial,
                username: this.username,
                tipo: this.tipo,
                email_institucional: this.email_institucional,
                role: this.role,
                location: this.location,
                password_hash: passwordHash,
                created_at: this.createdAt,
                updated_at: this.updatedAt
            };
        } catch (error) {
            console.error('Erro ao converter para DBModel:', error);
            throw new Error('Erro ao processar dados do usuário');
        }
    }

    // Método para salvar no banco de dados
    async save() {
        try {
            const dbModel = await this.toDBModel();
            
            // Salvar no banco SQLite usando dbUtils
            const savedPessoa = await dbUtils.insertPessoa(dbModel);
            
            return savedPessoa;
            
        } catch (error) {
            console.error('Erro ao salvar pessoa:', error);
            
            // Tratamento de erros específicos do SQLite
            if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                if (error.message.includes('username')) {
                    throw new Error('Username já está em uso');
                } else if (error.message.includes('email')) {
                    throw new Error('Email já está cadastrado');
                }
            }
            
            throw new Error('Erro ao salvar usuário no banco de dados');
        }
    }

    // Método estático para validar se username já existe
    static async findByUsername(username) {
        try {
            return await dbUtils.findByUsername(username);
        } catch (error) {
            console.error('Erro ao buscar por username:', error);
            return null;
        }
    }

    // Método estático para validar se email já existe
    static async findByEmail(email) {
        try {
            return await dbUtils.findByEmail(email);
        } catch (error) {
            console.error('Erro ao buscar por email:', error);
            return null;
        }
    }

    // Método estático para buscar por ID
    static async findById(id) {
        try {
            return await dbUtils.findById(id);
        } catch (error) {
            console.error('Erro ao buscar por ID:', error);
            return null;
        }
    }

    // Método estático para listar todas as pessoas
    static async findAll(page = 1, limit = 10) {
        try {
            return await dbUtils.findAll(page, limit);
        } catch (error) {
            console.error('Erro ao listar pessoas:', error);
            return { pessoas: [], total: 0, page, limit, totalPages: 0 };
        }
    }
}