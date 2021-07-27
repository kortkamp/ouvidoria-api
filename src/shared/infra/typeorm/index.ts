import { createConnection, getConnection } from 'typeorm';

const db = {
  async create() {
    await createConnection();
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    //   const entities = connection.entityMetadatas;

    await connection.query('DELETE FROM answers');
    await connection.query('DELETE FROM complaints');
    await connection.query('DELETE FROM districts');
    await connection.query('DELETE FROM users');

    // entities.forEach(async (entity) => {
    //   const repository = connection.getRepository(entity.name);
    //   await repository.query(`DELETE FROM ${entity.tableName}`);
    // });
  },
};
export default db;
