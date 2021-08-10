//require('dotenv/config');


const database = {
  dev: "ouvidoria_dev",
  test: 'ouvidoria_test',
  dist: 'ouvidoria_dev'
}

const entitiesDir = {
  dev: "./src/modules/**/infra/typeorm/entities/*.{ts,js}",
  test: "./src/modules/**/infra/typeorm/entities/*.{ts,js}",
  dist: "dist/modules/**/infra/typeorm/entities/*.{ts,js}"
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
  
  migrations:["src/shared/infra/typeorm/migrations/*.ts"],
  entities:[
    entitiesDir[process.env.NODE_ENV || 'dev'],
  ],
  cli:{
    migrationsDir: "src/shared/infra/typeorm/migrations",
    entitiesDir: "src/modules/**/infra/typeorm/entities"
  }
}

