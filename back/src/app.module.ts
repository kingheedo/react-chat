import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleWare } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/Users';
import { Channelchats } from './entities/Channelchats';
import { Channelmembers } from './entities/Channelmembers';
import { Channels } from './entities/Channels';
import { Dms } from './entities/Dms';
// import { Mentions } from './entities/Mentions';
import { Workspacemembers } from './entities/Workspacemembers';
import { Workspaces } from './entities/Workspaces';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import path, { join } from 'path';
import { UploadsModule } from './uploads/uploads.module';

/** 외부 서버로 가져온 키를 .env로 넣어주는 법
 *
 * this.configService.get('DB_PASSWORD'); 등이 가능하다.
 */
// const getEnv = async () => {
//const response = await axios.get('/비밀 키 요청');
//return response.data;
//   return {
//     DB_PASSWORD: 'reactchat',
//     NAME: '희도',
//   };
// };

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
    ConfigModule.forRoot({
      // .env 설정
      envFilePath: path.resolve(
        __dirname,
        `../../.env.${process.env.NODE_ENV}`,
      ),
      isGlobal: true,
    }),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DmsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      //entitiy와 mysql 커넥션
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT),
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
      synchronize: true, //entities의 schema 모델 설정 관계들을 데이터베이스에 업데이트. db생성 후, production에서는 false설정(데이터 날아갈 수 있음)!
      logging: process.env.NODE_ENV !== 'production', // 개발할땐 켜주는게 좋다. orm은 관계가 복잡해질수록 비효율적일 수도 있다. orm이 어떤 sql문으로 쿼리를 날렸는지 확인하기 위해서 켜두자.
      keepConnectionAlive: true,
      charset: 'utf8mb4_general_ci', // 이모티콘 사용을위해
    }),
    TypeOrmModule.forFeature([Users]),
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, UsersService], //의존성주입(DI, Dependency Injection)을 위해 설정
  // providers :[
  //원래 providers는 의존성주입을 할 때 이런 식의 형식으로 되어 있다.
  // { //클래스
  //   provide: AppService,
  //   useClass: AppService
  // },
  // { //null boolean string 등
  //   provide: 'CUSTOM_KEY', //고유키
  //   useValue: 'CUSTOM_VALUE' //실제 서비스 객체등
  // },
  // {
  //   provide: AppService,
  //   useFactory: () => {
  // 별의별 작업
  //     return {
  //       a: 'b'
  //     }
  //   }
  // }
  // ]
})
export class AppModule implements NestModule {
  // 미들웨어 적용하기
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes('*'); //라우트 전체에 로거미들웨어를 적용하겠다.
  }
}
