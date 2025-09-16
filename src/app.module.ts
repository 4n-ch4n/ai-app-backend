import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './ai/ai.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [AiModule, ConfigModule.forRoot(), S3Module],
  controllers: [],
  providers: [],
})
export class AppModule {}
