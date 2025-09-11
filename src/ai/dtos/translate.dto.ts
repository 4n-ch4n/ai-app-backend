import { IsNotEmpty, IsString } from 'class-validator';

export class TranslateDTO {
  @IsString()
  @IsNotEmpty()
  readonly prompt: string;

  @IsString()
  @IsNotEmpty()
  readonly lang: string;
}
