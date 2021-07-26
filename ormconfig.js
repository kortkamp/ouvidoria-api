require('dotenv/config');


const database = {
  dev: "ouvidoria_dev",
  test: 'ouvidoria_test'
}


module.exports = {
  name:"default",
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "user",
  password: "password",
  database: database[process.env.NODE_ENV || 'dev'],

  synchronize: true,
  logging: false,
  
  migrations:["./shared/infra/typeorm/migrations/*.ts"],
  entities:[
    //"/home/marcelo/dev/ouvidoria-api/src/modules/**/infra/typeorm/entities/*.{ts,js}"
    //"dist/modules/**/infra/typeorm/entities/*.{ts,js}"
    "./src/modules/**/infra/typeorm/entities/*.{ts,js}"
  ],
  cli:{
    "migrationsDir": "src/shared/infra/typeorm/migrations",
    "entitiesDir": "src/modules/**/infra/typeorm/entities"
  }
}

