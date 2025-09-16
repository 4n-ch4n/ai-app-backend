import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { AiService } from './ai.service';
import {
  OrthoGraphyDTO,
  ProsConsDiscusserDTO,
  TextToAudioDTO,
  TranslateDTO,
} from './dtos';

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

  @Post('translate')
  translate(@Body() translateDTO: TranslateDTO) {
    return this.aiService.translate(translateDTO);
  }

  @Post('text-to-audio')
  textToAudio(@Body() textToAudioDTO: TextToAudioDTO) {
    return this.aiService.texToAudio(textToAudioDTO);
  }

  @Get('text-to-audio/:fileId')
  textToAudioGetter(@Param('fileId') fileId: string) {
    return this.aiService.textToAudioGetter(fileId);
  }
}
