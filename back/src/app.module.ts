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
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [getEnv],
    }),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DmsModule,
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
  //   provide: 'CUSTOM_KEY',
  //   useValue: 'CUSTOM_KEY'
  // },
  // {
  //   provide: AppService,
  //   useFactory: () => {
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
