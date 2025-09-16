import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { S3Module } from '../s3/s3.module';

@Module({
  controllers: [AiController],
  providers: [AiService],
  imports: [S3Module],
})
export class AiModule {}
