import {
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private bucketAudioPath: string = 'audios';
  private s3: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: configService.get('SPACE_REGION') ?? '',
      endpoint: configService.get('SPACE_URL') ?? '',
      credentials: {
        accessKeyId: configService.get('SPACE_ACCESS_KEY') ?? '',
        secretAccessKey: configService.get('SPACE_SECRET_KEY') ?? '',
      },
      forcePathStyle: false,
    });
  }

  async saveAudio(file: Buffer) {
    const key = `${this.bucketAudioPath}/${new Date().getTime()}.wav`;
    const command = new PutObjectCommand({
      Bucket: this.configService.get('SPACE_BUCKET') ?? '',
      Key: key,
      Body: file,
      ContentType: 'audio/wav',
    });

    await this.s3.send(command);

    const url = `${this.configService.get('SPACE_CDN_URL')}/${key}`;

    return url;
  }

  async getAudio(fileId: string) {
    try {
      const key = `${this.bucketAudioPath}/${fileId}.wav`;
      const command = new HeadObjectCommand({
        Bucket: this.configService.get('SPACE_BUCKET') ?? '',
        Key: key,
      });

      await this.s3.send(command);

      const url = `${this.configService.get('SPACE_CDN_URL')}/${key}`;

      return url;
    } catch {
      throw new NotFoundException(`File with id ${fileId} not found`);
    }
  }
}
