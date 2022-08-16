
# Desafio DevWeb

Organizador de Tasks, desafio de full-stack developer. 


## Funcionalidades

- Cadastrar nova task com os atributos nome, descrição, data e hora e tempo de duração
- Remover tasks já cadastradas
- Campo de busca de tarefas por nome.
- Edição da descrição da tarefa selecionada
- Integração com banco MongoDB
- Marcar Tarefas como feita(Done) indicadas em verde.


## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:gabriel-greguer/DesafioFullStack.git
```

Entre no diretório do projeto backend

```bash
  cd ./backend
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm start
```

Caso tenha erro rodando no linux

```bash
  localize o arquivo node_modules/whatwg-url/dist/encoding.js or .../lib/encoding.js
  e adicione a linha a seguir no topo { TextEncoder, TextDecoder } = require("util");
  de npm start novamente
```


Entre no diretório do projeto frontend

```bash
  cd ../frontend
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor frontend

```bash
  npm run dev
```


## Stack utilizada

**Front-end:** React, Bootstrap, Css.

**Back-end:** Node, Express, MongoDB


## Autores

- [@GabrielGreguer](https://github.com/gabriel-greguer)


## Licença

[MIT](https://choosealicense.com/licenses/mit/)

