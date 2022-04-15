![App Logo](public/images/CST2-Logo-Transparent-Smaller.png)
# Museum Backend ⚡

CST2-Backend is the backend API for the [Museum database frontend](https://github.com/Junnyyy/MuseumDB-React). 

Using ExpressJS the API is using the Restful API standard.

## Installation/Startup guide 🔨

Node version requirement 
```
version >= 14.17.6
```

1. Install packages
```
npm install
```

2. Environmental variables
- create a '.env' file in the source directory
```
# located in /.env
# env format

HOST = 'MYSQL-HOST'
SQLUSER = 'MYSQL-USER'
PASSWORD = 'MYSQL-PASSWORD'
DATABASE = 'MYSQL-DB'
PORT = 'OPTIONAL-DEV-PORT-HERE (Remove line if production)'
TOKEN_SECRET = 'JWT-SECRET-HERE'
```

3. Start Application
- To start as developer
(Uses nodemon)
```
npm run start:dev
```
- Production
```
npm start
```

## Technologies 📡

#### Front-end
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

#### Back-end
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

#### Database
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

#### Hosting
![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
