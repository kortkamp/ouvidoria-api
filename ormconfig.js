require('dotenv/config');


const database = {
  dev: "ouvidoria_dev",
  test: 'ouvidoria_test'
}

module.exports = {
  
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "user",
  password: "password",
  database: database[process.env.NODE_ENV],

  synchronize: true,
  logging: false,
  
  migrations:["src/shared/infra/typeorm/migrations/*.ts"],
  entities:[
    "src/modules/**/infra/typeorm/entities/*.ts"
  ],
  cli:{
    "migrationsDir": "src/shared/infra/typeorm/migrations",
    "entitiesDir": "src/modules/**/infra/typeorm/entities"
  }
}

