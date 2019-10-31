# NodeJS Upload-CSV-File

## Descrição do Projeto
O repo trata-se de um sistema para upload de arquivos .csv para persistencia de dados em uma base Mysql.

## 1. Como instalar e testar

### Requerimentos
- Nodejs > 8.x
- NPM (Node Package Manager) > 6.4.x
- Mysql (Banco de dados) versão 14.14

### O projeto conta algumas bibliotecas instaladas via NPM.
#### 1.1 Acesse a pasta do projeto e digite o comando: 

```
npm install / npm i
```

#### 1.2 Para rodar o projeto em sua máquina: 

```
node app.js / nodemon app.js
```

#### 1.3 Acesse o diretório raiz do projeto até o arquivo .env! Configure as variáveis de ambiente do MYSQL> EX:

```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=database
MYSQL_PORT=3306
```

#### 1.4 O projeto estará rodando na porta 3000. Link para Interface de documentação da API.

```
http://localhost:3000/api-docs/
```

#### 1.5 Acesse a raiz do projeto. Importe o arquivo para o Mysql:

```
database.sql
```

## 2. Desevolvimento do projeto

 * O projeto em questão foi desenvolvido utilizando boas práticas de programação. 
 * Repository and Service pattern.
 * Clean Code.
 * Utilização da boa prática GitFlow para manipulação e versionamento do sistema.
 * Alguma bibliotecas utilizadas:
 * express
 * lodash
 * nodemon 
 * swagger
 * mysql
 * fast-csv
 * dotenv
 * body-parser
 * Sistema Operacional Utilizado (macOs Mojave v.10.14)
 * IDE Utilizada: Visual Studio Code (Microsoft)
