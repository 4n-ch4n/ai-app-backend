import { Response } from 'express';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AiService } from './ai.service';
import { OrthoGraphyDTO, ProsConsDiscusserDTO } from './dtos';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('orthography-check')
  orthographyCheck(@Body() orthoGraphyDTO: OrthoGraphyDTO) {
    return this.aiService.orthographyCheck(orthoGraphyDTO);
  }

  @Post('pros-cons-discusser')
  prosConsDiscusser(@Body() prosconsDiscusserDTO: ProsConsDiscusserDTO) {
    return this.aiService.prosConsDicusser(prosconsDiscusserDTO);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDiscusserStream(
    @Body() prosconsDiscusserDTO: ProsConsDiscusserDTO,
    @Res() res: Response,
  ) {
    const stream =
      await this.aiService.prosConsDicusserStream(prosconsDiscusserDTO);

    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      res.write(chunk.text);
    }

    res.end();
  }
}
