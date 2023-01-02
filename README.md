## Panduan
### Clone Project
Link clone :
```
git clone 
```
### Install All Library & Package
Command Line:
```
npm i
```
### Create DB In DMBS 
the database name is adjusted to the config/config.json 
```
{
  "development": {
    "username": "root",
    "password": null,
    "database": "k-link",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
### ORM - Sequelize Migrations
Command Line:
```
npx sequelize-cli db:migrate
```









