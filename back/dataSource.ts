import dotenv from 'dotenv';
import { Channelchats } from './src/entities/Channelchats';
import { Channelmembers } from './src/entities/Channelmembers';
import { Channels } from './src/entities/Channels';
import { Dms } from './src/entities/Dms';
import { Users } from './src/entities/Users';
import { Workspacemembers } from './src/entities/Workspacemembers';
import { Workspaces } from './src/entities/Workspaces';
import { DataSource } from 'typeorm';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    Channelchats,
    Channelmembers,
    Channels,
    Dms,
    Users,
    Workspacemembers,
    Workspaces,
  ],
  migrations: [__dirname + '/src/migrations/*.ts'],
  synchronize: false,
  logging: true,
  charset: 'utf8mb4_general_ci', // 이모티콘 사용을위해
});

export default dataSource;
