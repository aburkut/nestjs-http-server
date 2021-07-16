import { Module } from '@nestjs/common';
import { IndexController } from './IndexController';

@Module({
  controllers: [ IndexController ],
})
export class IndexModule {}
