# Projeto Web Fullstack

## Passo a passo para inicialização

1. Faça o download e instale a versão LTS do Node.js;
2. Faça o download e instale a versão estável do MySQL;
3. Através de um Terminal (Linux) ou de uma janela de CMD/Powershell (Windows) navegue até a pasta raíz da aplicação e execute o comando abaixo para instalar as dependências do projeto:

```bash
npm install && cd cliente_react && npm install
```
4. Agora para levantar o servidor Node e também a aplicação React, simultaneamente, execute o seguinte comando:
```bash
npm run dev
```
5. Com o servidor online e aplicação rodando, entre na rota `/api/installation` para gerar o usuário admin, e colocar outras entradas no teu banco de dados que servirão de mock; 

6. Acesse http://localhost:3000/ para visualizar a aplicação react funcionando.
 
## API 

### Node.js - Express.js
- Desenvolvido com express.js
- Download [Node.js](https://nodejs.org/en/download)

### Banco de dados
- Banco de dados MySQL utilizado
- Download [MySQL](https://dev.mysql.com/downloads/installer/)
- Modelos utilizados foram User.js e Cities.js, utilizando Design Pattern Builder

# Projeto Cliente

- Projeto criado com o script Create-React-App desenvolvido pela própria equipe criadora do React, do Facebook. Tal projeto é levantado juntamente com a aplicação Node + Express, que serve uma API para o nosso banco de dados.
- Comandos para levantar o Servidor, o Cliente e ambos os projetos simultaneamente:
```bash
npm run server
npm run client
npm run dev
```
- Scripts que estão no `package.json` do projeto raíz:
```js
// package.json
{
    // [...]
    scripts: {
        "server": "nodemon app.js",
        "client": "cd cliente_react && npm start",
        "dev": "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\"",
        // [...]
    },
    // [...]
}
```
- O projeto cliente, chamado de `cliente_react`, tem em sua estrutura 5 pastas principais:
  - `Components`: Responsável por conter os componentes usados de forma global na aplicação;
  - `Pages`: Responsável por conter as páginas da aplicação;
  - `Router`: Responsável por conter os arquivos referentes ao gerenciamento de rotas da aplicação;
  - `Store`: Responsável por conter os arquivos referetnes aos Contextos da aplicação ou gerenciamento de um estado global da aplicação.

- O Componente `Authenticator` tem como função um Serviço que monitora e controla a autenticação do usuário.

- O Componente `AuthRoute` serve como um High Order Component, que por sua vez atribui como side-effect para qualquer página filha uma auto-navegação para `HomePage` caso usuário não esteja autenticado e tentando acessar tal rota.

- O Componente `Template` serve como o esqueleto da aplicação, guiando os setores de `Header` e "Corpo" da aplicação, onde cada um possui seu arquivo de estilo.

- Credenciais de Admin:
```
login: admin@admin.com
senha: senhaAdmin1
```


## Padrões e SOLID
- Utilização de modularização, classes e arquivos para auxílio
### Auth
- middlewares.js
    - arquivo para definição e autenticação de tokens

- sanitizer.js
    - arquivo para sanitização de auxílio para proteção de injeções

### Config
- cache.js
    - define um arquivo principal para 'deploy' do cache

- database.js
    - define um arquivo principal para 'deploy' do banco de dados

### Helpers
- citiesHelpers.js
    - define funções de auxílio para a rota de cidades, lidando com o banco de dados e cache

- installationHelper.js
    - define funções de auxílio para a rota de instalação, lidando com o banco de dados e cache 

- loginHelper.js
    - define funções de auxílio para rota de instalação, lidando com criação de token e cache

- userHelper.js
    - define funções de auxílio para rota de usuários, lidando com banco de dados e cache

### Models
#### City
- CityBuilder.js
    - define uma classe de construção de uma cidade

- CityModel.js
    - define uma classe simples de uma cidade

#### User
- UserBuilder.js
    - define uma classe de construção de um usuário

- UserModel.js
    - define uma classe simples de um usuário

#### User.js e City.js
- Definição de tabelas

## Routes
- cities.js
    - rota para lidar com cidades
- installation.js
    - rota para instalação inicial para testes simples
- login.js
    - rota para autenticação de usuários e administradores
- users.js
    - rota para lidar com usuários

- users.json e cities.json são arquivos para a instalação

## Contribuidores

- Marcelo Moretão
- Pedro Esteves
