import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';
import { OrthoGraphyDTO } from './dtos';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class AiService {
  private genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  async orthographyCheck(orthoGraphyDTO: OrthoGraphyDTO) {
    return await orthographyCheckUseCase(this.genAI, {
      prompt: orthoGraphyDTO.prompt,
    });
  }
}
