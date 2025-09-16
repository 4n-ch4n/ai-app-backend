import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TextToAudioDTO {
  @IsString()
  @IsNotEmpty()
  readonly prompt: string;

  @IsString()
  @IsOptional()
  readonly voice?: string;
}
