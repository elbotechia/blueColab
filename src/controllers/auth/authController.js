import path from "path";
import dotenv from "dotenv";
import { db } from "../../config/knex.js";
import { handlePassword } from "../../utils/handlePassword.js";
dotenv.config();

const PATH_2_JSON = process.env.JSON_DIRECTORY||"DATA/JSON"

export class AuthController {
    
    async postSignUp(req, res) {
        console.log('🚀 Iniciando postSignUp...');
        console.log('📥 Body recebido:', req.body);
        
        try {
            // Verificar se há dados no body
            if (!req.body || Object.keys(req.body).length === 0) {
                console.log('❌ Body vazio');
                return res.status(400).json({
                    success: false,
                    message: "Dados não fornecidos",
                    error: "Request body is empty"
                });
            }

            const td = new Date();
            const tdISO = td.toISOString();
            
            // Destructuring correto dos dados
            const {
                nome_referencial,
                username,
                password,
                confirmPassword,
                email_institucional,
                role = "USER",
                tipo = "PF",
                location,
                cpf,
                cnpj,
                rg
            } = req.body;

            console.log('📋 Dados extraídos:', {
                nome_referencial,
                username,
                email_institucional,
                role,
                tipo,
                hasPassword: !!password,
                hasConfirmPassword: !!confirmPassword
            });

            // Validações básicas
            if (!nome_referencial || !username || !password || !email_institucional) {
                console.log('❌ Campos obrigatórios faltando');
                return res.status(400).json({
                    success: false,
                    message: "Campos obrigatórios não preenchidos",
                    required: ["nome_referencial", "username", "password", "email_institucional"],
                    received: {
                        nome_referencial: !!nome_referencial,
                        username: !!username,
                        password: !!password,
                        email_institucional: !!email_institucional
                    }
                });
            }

            // Verificar se as senhas coincidem (apenas se confirmPassword foi enviado)
            if (confirmPassword && password !== confirmPassword) {
                console.log('❌ Senhas não coincidem');
                return res.status(400).json({
                    success: false,
                    message: "Senhas não coincidem"
                });
            }

            console.log('✅ Validações básicas passaram');

            // Verificar se username já existe usando Knex
            console.log('🔍 Verificando username existente...');
            const existingUserByUsername = await db('pessoas')
                .where('username', username)
                .first();
                
            if (existingUserByUsername) {
                console.log('❌ Username já existe:', username);
                return res.status(409).json({
                    success: false,
                    message: "Username já está em uso",
                    field: "username"
                });
            }

            // Verificar se email já existe usando Knex
            console.log('🔍 Verificando email existente...');
            const existingUserByEmail = await db('pessoas')
                .where('email_institucional', email_institucional)
                .first();
                
            if (existingUserByEmail) {
                console.log('❌ Email já existe:', email_institucional);
                return res.status(409).json({
                    success: false,
                    message: "Email já está cadastrado",
                    field: "email_institucional"
                });
            }

            console.log('✅ Verificações de duplicatas passaram');

            // Hash da senha
            console.log('🔐 Gerando hash da senha...');
            const password_hash = await handlePassword.encrypt(password);
            console.log('✅ Hash gerado com sucesso');

            // Preparar dados para inserção
            const pessoaData = {
                nome_referencial,
                username,
                tipo,
                role,
                email_institucional,
                password_hash,
                location: password_hash,
                created_at: tdISO,
                updated_at: tdISO
            };

            console.log('📤 Dados preparados para inserção:', {
                ...pessoaData,
                password_hash: '[HASH_OCULTO]'
            });

            // Inserir no banco usando Knex (SQLite não suporta RETURNING, então fazemos diferente)
            console.log('💾 Inserindo no banco...');
            const insertResult = await db('pessoas').insert(pessoaData);
            
            // Para SQLite, o ID é o lastRowid
            const savedPessoaId = insertResult[0];
            console.log('✅ Usuário inserido. ID:', savedPessoaId);

            // Buscar o registro criado
            console.log('🔍 Buscando registro criado...');
            const savedPessoa = await db('pessoas')
                .where('idPessoa', savedPessoaId)
                .first();

            if (!savedPessoa) {
                console.error('❌ Erro: Usuário inserido mas não encontrado');
                throw new Error('Usuário foi inserido mas não pode ser recuperado');
            }

            console.log('✅ Usuário salvo e recuperado com sucesso. ID:', savedPessoa.idPessoa);

            // Resposta de sucesso (não retornar dados sensíveis)
            const responseData = {
                success: true,
                message: "Usuário cadastrado com sucesso",
                data: {
                    id: savedPessoa.idPessoa,
                    nome_referencial: savedPessoa.nome_referencial,
                    username: savedPessoa.username,
                    email_institucional: savedPessoa.email_institucional,
                    role: savedPessoa.role,
                    tipo: savedPessoa.tipo,
                    location: savedPessoa.location,
                    created_at: savedPessoa.created_at
                }
            };

            console.log('📤 Enviando resposta de sucesso');
            res.status(201).json(responseData);

        } catch (error) {
            console.error('💥 Erro no postSignUp:', {
                message: error.message,
                code: error.code,
                errno: error.errno,
                stack: error.stack
            });
            
            // Tratamento de erros específicos do SQLite
            if (error.code === 'SQLITE_CONSTRAINT_UNIQUE' || error.errno === 19) {
                const errorMessage = error.message.toLowerCase();
                
                if (errorMessage.includes('username')) {
                    return res.status(409).json({
                        success: false,
                        message: "Username já está em uso",
                        field: "username",
                        error: "DUPLICATE_USERNAME"
                    });
                } else if (errorMessage.includes('email')) {
                    return res.status(409).json({
                        success: false,
                        message: "Email já está cadastrado",
                        field: "email_institucional",
                        error: "DUPLICATE_EMAIL"
                    });
                }
            }

            // Erro genérico
            res.status(500).json({
                success: false,
                message: "Erro interno do servidor",
                error: error.message,
                details: process.env.NODE_ENV === 'development' ? {
                    code: error.code,
                    errno: error.errno
                } : undefined
            });
        }
    }

    // Método para listar usuários (para teste)
    async getUsers(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;
            
            // Buscar usuários com Knex
            const pessoas = await db('pessoas')
                .select('idPessoa', 'nome_referencial', 'username', 'email_institucional', 'role', 'tipo', 'location', 'created_at')
                .orderBy('created_at', 'desc')
                .limit(limit)
                .offset(offset);
            
            // Contar total de registros
            const totalResult = await db('pessoas').count('idPessoa as total').first();
            const total = totalResult.total;
            
            res.status(200).json({
                success: true,
                message: "Usuários listados com sucesso",
                data: pessoas,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / limit)
                }
            });
            
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            res.status(500).json({
                success: false,
                message: "Erro ao listar usuários",
                error: error.message
            });
        }
    }

    // Método para buscar usuário por ID
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            
            const pessoa = await db('pessoas')
                .select('idPessoa', 'nome_referencial', 'username', 'email_institucional', 'role', 'tipo', 'location', 'created_at', 'updated_at')
                .where('idPessoa', id)
                .first();
            
            if (!pessoa) {
                return res.status(404).json({
                    success: false,
                    message: "Usuário não encontrado"
                });
            }
            
            res.status(200).json({
                success: true,
                message: "Usuário encontrado",
                data: pessoa
            });
            
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            res.status(500).json({
                success: false,
                message: "Erro ao buscar usuário",
                error: error.message
            });
        }
    }

}