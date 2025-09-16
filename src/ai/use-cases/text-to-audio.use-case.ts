/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GoogleGenAI } from '@google/genai';
import { Writer } from 'wav';
import { S3Service } from '../../s3/s3.service';
import { PassThrough } from 'stream';

interface Options {
  filesService: S3Service;
  prompt: string;
  voice?: string;
}

export const textToAudioUseCase = async (
  gemini: GoogleGenAI,
  options: Options,
) => {
  const { prompt, voice, filesService } = options;
  const voices = {
    Zephyr: 'Zephyr',
    Kore: 'Kore',
    Orus: 'Orus',
    Autonoe: 'Autonoe',
    Fenrir: 'Fenrir',
    Aoede: 'Aoede',
    Charon: 'Charon',
  };

  const selectedVoice = voice ? voices[voice] : voices.Kore;

  const response = await gemini.models.generateContent({
    model: 'gemini-2.5-flash-preview-tts',
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: selectedVoice },
        },
      },
    },
  });

  const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

  if (!data) {
    throw new Error(
      'Failed to generate audio. No data received from the model.',
    );
  }

  const pcmData = Buffer.from(data, 'base64');

  const wavBuffer = await new Promise<Buffer>((resolve, reject) => {
    const passThrough = new PassThrough();
    const chunks: Buffer[] = [];

    passThrough.on('data', (chunk) => {
      chunks.push(chunk);
    });
    passThrough.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    passThrough.on('error', reject);

    const writer = new Writer({
      channels: 1,
      sampleRate: 24000, // As per Gemini documentation
      bitDepth: 16,
    });

    writer.pipe(passThrough);
    writer.end(pcmData);
  });

  const fileName = await filesService.saveAudio(wavBuffer);

  return { url: fileName };
};
