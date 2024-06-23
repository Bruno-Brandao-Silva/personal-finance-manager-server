# Personal Finance Manager Server

## Descrição

O Personal Finance Manager Server é um sistema para gerenciamento de relatórios financeiros, permitindo que os usuários criem, leiam, atualizem e excluam relatórios financeiros mensais e relatórios predefinidos. Além disso, oferece funcionalidades de autenticação de usuários, incluindo registro, login, logout e gerenciamento de perfis.

## Tecnologias Utilizadas

- Node.js
- Express.js
- Mongoose (ODM para MongoDB)
- TypeScript
- bcrypt (para hashing de senhas)
- JWT (JSON Web Tokens para autenticação)

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/Bruno-Brandao-Silva/personal-finance-manager-server.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd personal-finance-manager-server
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Configure as variáveis de ambiente em um arquivo `.env`:

    ```
    MONGODB_URI = mongodb://localhost:27017/pfsm
    JWT_SECRET = secret
    TOKEN_KEY = PFSM_KEY
    ```

5. Inicie o servidor:

    ```bash
    npm run dev
    ```

## Rotas

### Autenticação

#### Registrar Usuário

- **Rota**: `/api/register`
- **Método**: `POST`
- **Descrição**: Cria um novo usuário.
- **Corpo da Requisição**:

    ```json
    {
        "name": "Nome do Usuário",
        "email": "email@exemplo.com",
        "password": "senha"
    }
    ```

#### Login

- **Rota**: `/api/login`
- **Método**: `POST`
- **Descrição**: Autentica um usuário e retorna um token JWT.
- **Corpo da Requisição**:

    ```json
    {
        "email": "email@exemplo.com",
        "password": "senha"
    }
    ```

#### Logout

- **Rota**: `/api/logout`
- **Método**: `POST`
- **Descrição**: Faz logout do usuário atual, invalidando o token JWT.
- **Cabeçalho**: `Authorization: Bearer <token>`

### Usuário

#### Obter Dados do Usuário

- **Rota**: `/api/user`
- **Método**: `GET`
- **Descrição**: Retorna os dados do usuário autenticado.
- **Cabeçalho**: `Authorization: Bearer <token>`

#### Atualizar Perfil do Usuário

- **Rota**: `/api/user`
- **Método**: `PATCH`
- **Descrição**: Atualiza os dados do perfil do usuário autenticado.
- **Cabeçalho**: `Authorization: Bearer <token>`
- **Corpo da Requisição**: JSON com os campos a serem atualizados.

#### Deletar Usuário

- **Rota**: `/api/user`
- **Método**: `DELETE`
- **Descrição**: Deleta o usuário autenticado.
- **Cabeçalho**: `Authorization: Bearer <token>`

### Relatórios Financeiros

#### Criar Relatório Financeiro

- **Rota**: `/api/financial-reports/:year/:month`
- **Método**: `POST`
- **Descrição**: Cria um novo relatório financeiro para o ano e mês especificados.
- **Cabeçalho**: `Authorization: Bearer <token>`
- **Corpo da Requisição**:

    ```json
    {
        "incomes": [{
            "description": "Exemplo de Renda",
            "amount": 3000
        }],
        "expenses": [{
            "description": "Exemplo de Gasto",
            "amount": 1000
        }]
    }
    ```

#### Obter Relatórios Financeiros

- **Rota**: `/api/financial-reports`
- **Método**: `GET`
- **Descrição**: Retorna todos os relatórios financeiros do usuário autenticado.
- **Cabeçalho**: `Authorization: Bearer <token>`

#### Obter Relatório Financeiro Específico

- **Rota**: `/api/financial-reports/:year/:month`
- **Método**: `GET`
- **Descrição**: Retorna o relatório financeiro para o ano e mês especificados.
- **Cabeçalho**: `Authorization: Bearer <token>`

#### Atualizar Relatório Financeiro

- **Rota**: `/api/financial-reports/:year/:month`
- **Método**: `PATCH`
- **Descrição**: Atualiza o relatório financeiro para o ano e mês especificados.
- **Cabeçalho**: `Authorization: Bearer <token>`
- **Corpo da Requisição**:

    ```json
    {
        "incomes": [{
            "description": "Exemplo de Renda",
            "amount": 3000
        }],
        "expenses": [{
            "description": "Exemplo de Gasto",
            "amount": 1000
        }]
    }
    ```

#### Deletar Relatório Financeiro

- **Rota**: `/api/financial-reports/:year/:month`
- **Método**: `DELETE`
- **Descrição**: Deleta o relatório financeiro para o ano e mês especificados.
- **Cabeçalho**: `Authorization: Bearer <token>`

### Relatórios Predefinidos

#### Criar Relatório Predefinido

- **Rota**: `/api/preset-reports`
- **Método**: `POST`
- **Descrição**: Cria um novo relatório predefinido.
- **Cabeçalho**: `Authorization: Bearer <token>`
- **Corpo da Requisição**:

    ```json
    {
        "incomes": [{
            "description": "Exemplo de Renda",
            "amount": 3000
        }],
        "expenses": [{
            "description": "Exemplo de Gasto",
            "amount": 1000
        }]
    }
    ```

#### Obter Relatório Predefinido

- **Rota**: `/api/preset-reports`
- **Método**: `GET`
- **Descrição**: Retorna o relatório predefinido do usuário autenticado.
- **Cabeçalho**: `Authorization: Bearer <token>`

#### Atualizar Relatório Predefinido

- **Rota**: `/api/preset-reports`
- **Método**: `PATCH`
- **Descrição**: Atualiza o relatório predefinido do usuário autenticado.
- **Cabeçalho**: `Authorization: Bearer <token>`
- **Corpo da Requisição**:

    ```json
    {
        "incomes": [{
            "description": "Exemplo de Renda",
            "amount": 3000
        }],
        "expenses": [{
            "description": "Exemplo de Gasto",
            "amount": 1000
        }]
    }
    ```

#### Deletar Relatório Predefinido

- **Rota**: `/api/preset-reports`
- **Método**: `DELETE`
- **Descrição**: Deleta o relatório predefinido do usuário autenticado.
- **Cabeçalho**: `Authorization: Bearer <token>`

## Estrutura do Projeto

- `src/controllers`: Contém os controladores para as rotas.
- `src/schemas`: Contém os modelos do Mongoose.
- `src/middlewares`: Contém middlewares, incluindo autenticação.
- `src/lib`: Contém funções auxiliares.
- `src/index.ts`: Ponto de entrada da aplicação.
