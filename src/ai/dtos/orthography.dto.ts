import { IsInt, IsOptional, IsString } from 'class-validator';

export class OrthoGraphyDTO {
  @IsString()
  readonly prompt: string;

  @IsInt()
  @IsOptional()
  readonly maxTokens?: number;
}
