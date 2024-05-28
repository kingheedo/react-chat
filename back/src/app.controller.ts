import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // @Inject('CUSTOM_KEY') private readonly customKey; //커스텀 키로 providers에서 가져올때
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
