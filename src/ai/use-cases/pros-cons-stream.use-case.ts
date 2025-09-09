import { GoogleGenAI } from '@google/genai';

interface Options {
  prompt: string;
}

export const prosConsStreamUseCase = async (
  gemini: GoogleGenAI,
  options: Options,
) => {
  const { prompt } = options;

  return await gemini.models.generateContentStream({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      temperature: 0.6,
      systemInstruction: `
        You will receive a question and your task is to give an answer with pros and cons,
        the answer must be in markdown format, the pros and cons should be in a list.
      `,
    },
  });
};
