# LÓGICA PARA CADASTRO:
Este documento tem como objetivo aclarar a lógica do CADASTRO de um Usuário que deseja cadastrar-se no sistema em seu primeiro ingresso, os passos a seguir são:

1. Entrar na web api endpoint /users/sign-up onde se encontra o formulário de cadastro
2. O preenchimento deste cadastro fornece os dados para a criação de uma pessoa em base de dados relacionais SQL que é o primeiro passo do cadastro permanente da pessoa em nosso sistema, os dados são armazenados se aclaram asseguir para melhor transparencia com usuário final em formato JSON a partir dos inputs tratados por meio de npm package axios:

```JSON
{
  "nome_referencial": "Deve conter o nome de registro ou nome social do usuário a cadastrar-se",
  "username": "nome de usuário na plataforma contendo entre 3 e 60 caracteres",
  "email_institucional": "email institucional da @maua.br",
  "tipo": "automatico como 'PF' referente a PESSOA FÍSICA",
  "role": "automatico segundo padrão de email institucional se conter letras 'USER' se numeros 'ESTUDANTE'",
  "location": "EQUIVALE AO NÚMERO DE CNPJ OU CPF OU RG ALFA NUMÉRICO E COM CARACTERES EM MAIUSCULO, SERVE PARA RECUPERAÇÃO DE CONTA EM CASO DE PERDA DE SENHA ATUALIZADA E É SALVO DE FORMA HASHEADA COM BCRYPT.JS",
  "password_hash": "O primeiro password se não alterado equivale ao location",
  "created_at": "DATE TIME NOW () EM FORMATO TO ISO STRING() NA HORA DE CRIADO O USUÁRIO",
  "updated_at": "DATE TIME NOW () EM FORMATO TO ISO STRING() NA HORA DE ATUALIZADO O USUÁRIO"
}
```

CABE RESSALTAR QUE ESSA PARTE DO CADASTRO É QUASE QUE IMUTAVEL E SERVE COMO INFORMAÇÃO BASE PARA RECUPERAÇÃO DE PESSOA E ACCOUNT E DADOS NOSQL  

ESSA **PRIMEIRA ETAPA FAZ REFERÊNCIA AO PROCESSO DE SIGN UP** que é seguido pelo encadenamento do processo automatizado de GENERATE ACCOUNT e do processo personalizavel de CREATE PROFILE