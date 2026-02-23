import OpenAI from 'openai';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

export async function queryOpenAIAPI(messages, systemPrompt) {
  if (!apiKey) throw new Error('No OpenAI API key configured');

  const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    max_tokens: 1024,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages.map(m => ({ role: m.role, content: m.content })),
    ],
  });

  return response.choices[0].message.content;
}
