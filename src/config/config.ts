export default () => ({
  // 如果环境中不存在启动端口，就使用端口3000
  PORT: parseInt(process.env.PORT, 10) || 3000,
  DB_TYPE: process.env.DB_TYPE || 'mysql',
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT, 10) || 3306,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_SYNC: process.env.DB_SYNC === 'true', // 开启 TypeORM 自动同步表结构
});

export enum EnumConfig {
  DB_TYPE = 'DB_TYPE',
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',

  DB_USERNAME = 'DB_USERNAME',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_DATABASE = 'DB_DATABASE',

  DB_SYNC = 'DB_SYNC',
}
