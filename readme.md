## API 
### Node.js - Express.js
- Desenvolvido com express.js
- Download [Node.js](https://nodejs.org/en/download)

### Banco de dados
- Banco de dados MySQL utilizado
- Download [MySQL](https://dev.mysql.com/downloads/installer/)
- Modelos utilizados foram User.js e Cities.js, utilizando Design Pattern Builder

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

- instalationHelper.js
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
- instalation.js
    - rota para instalação inicial para testes simples
- login.js
    - rota para autenticação de usuários e administradores
- users.js
    - rota para lidar com usuários

- users.json e cities.json são arquivos para a instalação