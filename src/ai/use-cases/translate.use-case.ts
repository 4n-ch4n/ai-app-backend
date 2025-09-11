import { GoogleGenAI } from '@google/genai';

interface Options {
  prompt: string;
  lang: string;
}

export const translateUseCase = async (
  gemini: GoogleGenAI,
  options: Options,
) => {
  const { prompt, lang } = options;

  const response = await gemini.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Translate the following text to the language ${lang}: ${prompt}`,
    config: {
      temperature: 0.3,
      systemInstruction: `You will receive a text and your task is to translate it to the provided language.`,
    },
  });

  return { message: response.text };
};
