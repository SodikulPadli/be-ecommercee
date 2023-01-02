# be-ecommercee
> this is the Task of the backend developer, it's still far from perfect and requires further development, God willing, Alfakir, will always learn to improve it...thank you


## Instruction
### Clone Project in your local directory


### Install All Library & Package
* express
* sequelize
* sequelize-cli
* mysql2
* multer
* jsonwebtoken
* joi
* dotenv
* bcrypt

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
### Run Project
Command Line:
```
npm start
````

### Open Postman to Testing Project

#### Route API Project in
```
http://localhost:5000/api/v1/
```

#### Registrasi Request and Response
Register Request :
```
{
    "user":"sodikul",
    "email":"sodikul@mail.com",
    "password":"123456",
    "status":"customer"
}
```
Register Response :
```
{
    "status": "success",
    "data": {
        "user": {
            "user": "sodikul",
            "email": "sodikul@mail.com",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzI2NzM5NjB9.BIQNdLuB_7elfc8zfWQc5Yp30P_OiaXvIjyNZmn449c"
        }
    }
}
```
* Note Create 2 Acount with status different example status:admin , because only admin access to create product

#### Login Request and Response
Login Request :
```
{
    "email":"sodikul@mail.com",
    "password":"123456"
}
```
Login Response :
```
{
    "status": "success",
    "data": {
        "user": {
            "user": "sodikul",
            "email": "sodikul@mail.com",
            "status": "customer",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjcyNjczOTY4fQ.sv3vp2g5VzEjzoYkQoRn6whFhnPhEsLfsOFaIdUbHVM"
        }
    }
}
```
### Authentication All Request Or Response with Token and Access in Bearer Token

![b3](https://user-images.githubusercontent.com/57209543/210263335-07a54d54-727c-4fa5-af64-519ab66d1a57.PNG)


#### Add Product Request and Response
Add Product Request with form-data :

![b2](https://user-images.githubusercontent.com/57209543/210262151-804aef29-1436-4317-a1ad-fa14973441a8.PNG)

Add Product Response:
```
{
    "status": "sucess",
    "data": {
        "productData": {
            "id": 2,
            "name": "aqua",
            "price": 50000,
            "qty": 50,
            "image": "1672673913602-khihyaulumudin(JakaTingkir).png",
            "id_User": 1,
            "Users": {
                "id": 1,
                "user": "padli",
                "email": "padli@mail.com",
                "status": "admin"
            }
        },
        "image": "http://localhost:5000/uploads/1672673913602-khihyaulumudin(JakaTingkir).png"
    }
}
```
#### Add Order Request and Response
Add Order Request :
```
{
   "id_Product":2 
}
```
Add Order Response :
```
{
    "status": "Success",
    "message": "Add Cart"
}
```

#### Show Order  Response
Response :
```
{
    "status": "success",
    "data": [
        {
            "id": 1,
            "id_User": 2,
            "id_Product": 1,
            "order_Qty": 10,
            "status": "Success",
            "Products": {
                "name": "sanqua",
                "price": 50000,
                "image": "http://localhost:5000/uploads/1672673893030-jaka_20tingkir_400x400-removebg-preview.png"
            }
        },
        {
            "id": 2,
            "id_User": 2,
            "id_Product": 2,
            "order_Qty": 2,
            "status": "Add Cart",
            "Products": {
                "name": "aqua",
                "price": 50000,
                "image": "http://localhost:5000/uploads/1672673913602-khihyaulumudin(JakaTingkir).png"
            }
        }
    ]
}
```
#### Add Transaction Request and Response 
Request :
```
{
    "id_Order": 1,
    "id_Product": 1
}
```
Response:
```
{
    "status": "success",
    "message": "add transaction finished",
    "data": {
        "id": 1,
        "id_Order": 1,
        "id_User": 2,
        "id_Product": 1,
        "total_amount_transaction": null,
        "createdAt": "2023-01-02T15:44:58.000Z",
        "Orders": {
            "id": 1,
            "id_User": 2,
            "id_Product": 1,
            "order_Qty": 10,
            "status": "Add Cart"
        },
        "Users": {
            "id": 2,
            "user": "sodikul",
            "email": "sodikul@mail.com"
        },
        "Products": {
            "id": 1,
            "name": "sanqua",
            "price": 50000,
            "qty": 100,
            "image": "1672673893030-jaka_20tingkir_400x400-removebg-preview.png",
            "id_User": 1
        }
    }
}
```

#### Response data Transaction
Response
```
{
    "status": "Success",
    "message": "Product Data Found",
    "data": [
        {
            "id": 1,
            "total_amount_transaction": 500000,
            "createdAt": "2023-01-02T15:44:58.000Z",
            "Orders": {
                "status": "Success"
            },
            "Users": {
                "user": "sodikul"
            },
            "Products": {
                "name": "sanqua",
                "qty": 90
            }
        }
    ]
}
```



