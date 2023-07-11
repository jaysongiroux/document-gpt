import { Configuration, OpenAIApi } from 'openai';

// const OPEN_AI_TOKEN_KEY = process.env.OPEN_AI_API_TOKEN;
// const configuration = new Configuration({
//   apiKey: OPEN_AI_TOKEN_KEY,
// });
// const openai = new OpenAIApi(configuration);

/**
 * Utilizes chat GPT3.5-turbo to parse text into JSON
 * @param {String} text
 * @returns {Object} JSON object in set format for database
 */
export const convertTextToJsonChatGPT = async (context: string, prompt: string, token: string | null) => {
  if (!token) throw new Error('No token provided');

  const configuration = new Configuration({
    apiKey: token,
  });
  const openai = new OpenAIApi(configuration);

  const chatCompletion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: context },
    ],
  });
  try {
    if (chatCompletion?.data?.choices[0]?.message?.content) {
      return JSON.parse(chatCompletion?.data?.choices[0]?.message?.content);
    }
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
};

export const askQuestion = async (
  question: string,
  context: string,
  token: string | null,
): Promise<string | undefined> => {
  if (!token) throw new Error('No token provided');
  const configuration = new Configuration({
    apiKey: token,
  });
  const openai = new OpenAIApi(configuration);

  const prompt = `Given the following raw OCR output of a document please answer the following question in a short direct form: ${question}`;
  const chatCompletion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: prompt + ".  If you are unsure of a answer, say 'Sorry, I don't know that' " },
      { role: 'user', content: context },
    ],
  });

  try {
    return chatCompletion?.data?.choices[0]?.message?.content;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
};
