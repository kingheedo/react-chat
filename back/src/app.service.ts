import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    return this.configService.get('COOKIE_SECRET');
    //process.env.COOKIE_SECRET
  }
}
