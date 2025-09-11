import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import {
  orthographyCheckUseCase,
  prosConsDicusserUseCase,
  prosConsStreamUseCase,
  translateUseCase,
} from './use-cases';
import { OrthoGraphyDTO, ProsConsDiscusserDTO, TranslateDTO } from './dtos';

@Injectable()
export class AiService {
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
}
