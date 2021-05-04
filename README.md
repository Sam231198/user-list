# User List
API simples de cadastro de usuários utilizando o ExpressJS.

## Tecnologias usadas
- [Node](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

# Incializando
Para baixar todas a dependências, execute esste comando:
```bash
npm i
```

Para rodar a aplicação execute este comando:
```bash
npm start
```
A aplicação ira ser executada em `localhost:3000`

# Rotas

- `get: '/'`: Lista todos os usuários.
- `post: '/'`: Cria um usuário.
- `put: '/:id'`: Atualiza o nome e o sobrenome de um usuário.
- `put: '/updateNickName/:id'`: Atualiza o nickname de um usuário.
- `get: '/searchUser?name=<value>&?lastname=<value>'`: pesquisa os usuários pelo nome e pelo sobrenome.
- `get: '/user/:nickname'`: retorna o usuário do nickname correspondente pasasdo no parametro.
- `delete: '/delete/:id'`: Deleta um usuário.
