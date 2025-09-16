import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import {
  audioToTextUseCase,
  orthographyCheckUseCase,
  prosConsDicusserUseCase,
  prosConsStreamUseCase,
  textToAudioUseCase,
  translateUseCase,
} from './use-cases';
import {
  OrthoGraphyDTO,
  ProsConsDiscusserDTO,
  TextToAudioDTO,
  TranslateDTO,
} from './dtos';
import { S3Service } from '../s3/s3.service';
import { AudioToTextDTO } from './dtos/audio-to-text.dto';

@Injectable()
export class AiService {
  constructor(private readonly s3Service: S3Service) {}

  private genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  async orthographyCheck(orthoGraphyDTO: OrthoGraphyDTO) {
    return await orthographyCheckUseCase(this.genAI, {
      prompt: orthoGraphyDTO.prompt,
    });
  }

  async prosConsDicusser(prosconsDiscusserDTO: ProsConsDiscusserDTO) {
    return await prosConsDicusserUseCase(this.genAI, {
      prompt: prosconsDiscusserDTO.prompt,
    });
  }

  async prosConsDicusserStream(prosconsDiscusserDTO: ProsConsDiscusserDTO) {
    return await prosConsStreamUseCase(this.genAI, {
      prompt: prosconsDiscusserDTO.prompt,
    });
  }

  async translate(translateDTO: TranslateDTO) {
    return await translateUseCase(this.genAI, {
      prompt: translateDTO.prompt,
      lang: translateDTO.lang,
    });
  }

  async texToAudio(textToAudioDTO: TextToAudioDTO) {
    return await textToAudioUseCase(this.genAI, {
      filesService: this.s3Service,
      prompt: textToAudioDTO.prompt,
      voice: textToAudioDTO.voice,
    });
  }

  async textToAudioGetter(fileId: string) {
    return await this.s3Service.getAudio(fileId);
  }

  async audioToText(
    audioFile: Express.Multer.File,
    audioToTextDTO: AudioToTextDTO,
  ) {
    const { prompt } = audioToTextDTO;

    return await audioToTextUseCase(this.genAI, {
      audioFile,
      prompt,
    });
  }
}
