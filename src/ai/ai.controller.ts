import { Response } from 'express';
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AiService } from './ai.service';
import {
  AudioToTextDTO,
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

  @Post('audio-to-text')
  @UseInterceptors(FileInterceptor('file'))
  audioToText(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000 * 1024 * 5,
            message: 'File is bigger than 5 mb',
          }),
          new FileTypeValidator({ fileType: 'audio/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() audioToTextDTO: AudioToTextDTO,
  ) {
    return this.aiService.audioToText(file, audioToTextDTO);
  }
}
