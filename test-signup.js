// Teste simples do signup para debug
import fetch from 'node-fetch';

async function testSignup() {
    try {
        const userData = {
            nome_referencial: "João Silva",
            username: "joao_test_" + Date.now(),
            password: "MinhaSenh@123",
            confirmPassword: "MinhaSenh@123",
            email_institucional: "joao_test_" + Date.now() + "@teste.com",
            role: "USER",
            tipo: "PF",
            location: "São Paulo, SP",
            cpf: "123.456.789-09"
        };

        console.log('🧪 Testando signup com dados:', {
            ...userData,
            password: '[OCULTO]',
            confirmPassword: '[OCULTO]'
        });

        const response = await fetch('http://localhost:3000/auth/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        
        console.log('📊 Status:', response.status);
        console.log('📋 Resposta:', JSON.stringify(result, null, 2));

        if (response.ok) {
            console.log('✅ TESTE PASSOU - Usuário criado com sucesso!');
        } else {
            console.log('❌ TESTE FALHOU - Erro na resposta');
        }

    } catch (error) {
        console.error('💥 Erro no teste:', error.message);
    }
}

// Executar teste
testSignup();
