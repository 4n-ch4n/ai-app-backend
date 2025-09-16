import {
  createPartFromUri,
  createUserContent,
  GoogleGenAI,
  Type,
} from '@google/genai';

interface Options {
  prompt?: string;
  audioFile: Express.Multer.File;
}

export const audioToTextUseCase = async (
  gemini: GoogleGenAI,
  options: Options,
) => {
  const { prompt, audioFile } = options;

  const uploadedFile = await gemini.files.upload({
    file: new Blob([new Uint8Array(audioFile.buffer)], {
      type: audioFile.mimetype,
    }),
    config: { mimeType: audioFile.mimetype },
  });

  const response = await gemini.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: [
      createUserContent([
        createPartFromUri(uploadedFile.uri ?? '', uploadedFile.mimeType ?? ''),
        prompt ?? '',
      ]),
    ],
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          task: { type: Type.STRING },
          language: { type: Type.STRING },
          duration: { type: Type.NUMBER },
          text: { type: Type.STRING },
          segments: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.INTEGER },
                seek: { type: Type.INTEGER },
                start: { type: Type.NUMBER },
                end: { type: Type.NUMBER },
                text: { type: Type.STRING },
              },
              required: ['id', 'start', 'end', 'text'],
            },
          },
        },
        required: ['language', 'duration', 'text', 'segments'],
      },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const jsonResp: object = JSON.parse(response.text ?? '');

  return jsonResp;
};
