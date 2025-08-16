import { db } from '../config/knex.js';

// Script para criar/verificar a tabela pessoas no SQLite
async function createPessoasTable() {
    try {
        console.log('🔧 Verificando/criando tabela pessoas...');
        
        // Criar tabela pessoas se não existir
        await db.schema.createTableIfNotExists('pessoas', (table) => {
            table.increments('idPessoa').primary();
            table.string('nome_referencial').notNullable();
            table.string('tipo').defaultTo('PF');
            table.string('role').defaultTo('USER');
            table.string('username').notNullable().unique();
            table.string('email_institucional').notNullable().unique();
            table.string('password_hash').notNullable();
            table.string('location').nullable();
            table.datetime('created_at').defaultTo(db.fn.now());
            table.datetime('updated_at').defaultTo(db.fn.now());
            
            // Índices para melhor performance
            table.index(['username']);
            table.index(['email_institucional']);
            table.index(['tipo']);
            table.index(['role']);
        });

        console.log('✅ Tabela pessoas criada/verificada com sucesso');
        
        // Verificar se a tabela tem registros
        const count = await db('pessoas').count('idPessoa as total').first();
        console.log(`📊 Total de usuários na tabela: ${count.total}`);
        
    } catch (error) {
        console.error('❌ Erro ao criar tabela pessoas:', error);
        throw error;
    }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
    createPessoasTable()
        .then(() => {
            console.log('🎉 Script executado com sucesso');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Erro na execução:', error);
            process.exit(1);
        });
}

export { createPessoasTable };
