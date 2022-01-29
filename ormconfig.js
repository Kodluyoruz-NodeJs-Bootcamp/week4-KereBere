module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: process.env.TYPEORM_PORT,
  username: 'root',
  password: 'root',
  database: 'test_001',
  synchronize: true,
  logging: false,
  entities: process.env.TYPEORM_ENTITIES,
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
