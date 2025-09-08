import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { OrthoGraphyDTO } from './dtos';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('orthography-check')
  orthographyCheck(@Body() orthoGraphyDTO: OrthoGraphyDTO) {
    return this.aiService.orthographyCheck(orthoGraphyDTO);
  }
}
