import { GoogleGenAI } from '@google/genai';

interface Options {
  prompt: string;
}

export const prosConsDicusserUseCase = async (
  gemini: GoogleGenAI,
  options: Options,
) => {
  const { prompt } = options;

  const response = await gemini.models.generateContent({
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

  return { content: response.text };
};
