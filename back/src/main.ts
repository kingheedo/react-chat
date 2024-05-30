import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './httpException.filter';
import { ValidationPipe } from '@nestjs/common';
// import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import passport from 'passport';

declare const module: any;
const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  // app.use(cookieParser());
  // app.use(
  //   session({
  //     resave: false,
  //     saveUninitialized: false,
  //     secret: process.env.COOKIE_SECRET,
  //     cookie: {
  //       httpOnly: true,
  //     },
  //   }),
  // );
  // app.use(passport.initialize());
  // app.use(passport.session());

  const config = new DocumentBuilder()
    .setTitle('React Chat API')
    .setDescription('react chat api 문서')
    .setVersion('1.0')
    .addTag('react chat')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
  console.log(`listening on port ${port}`);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
