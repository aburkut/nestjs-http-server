import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class IndexController {

  @Get('/')
  public getIndex(): string {
    return 'OK';
  }

  @Get('/test')
  public getTest() :string {
    return 'Test';
  }

  @Get('/users')
  public getUser(): Array<{ [ key: string ]: string }> {
    return [
      {
        test: 'test',
      },
      {
        test2: 'test2'
      }
    ]
  }
}
