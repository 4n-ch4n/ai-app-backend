import { GoogleGenAI } from '@google/genai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  gemini: GoogleGenAI,
  options: Options,
) => {
  const { prompt } = options;

  const response = await gemini.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      temperature: 0.3,
      systemInstruction: `
        You will be provided with texts that may contain orthographic and grammatical errors,
        The words used must exist in the dictionary.
        You must respond ONLY with raw JSON, WITHOUT any code fences, backticks, or extra formatting,
        your task is to correct them and return the corrected information.
        Additionally, you need to provide a percentage score reflecting the user's success.
        If there are no errors, you should return a congratulatory message.
        Output example:
        {
          userScore: number,
          errors: string[], // ['error -> solution']
          message: string // use emojis and text to congratulate the user
        }
      `,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const jsonResp: object = JSON.parse(response.text ?? '');

  return jsonResp;
};
