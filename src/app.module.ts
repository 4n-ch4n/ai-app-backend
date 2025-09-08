import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [AiModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
