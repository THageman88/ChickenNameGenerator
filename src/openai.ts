export const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

interface ChatChoice {
  message: { content: string };
}
interface ChatResponse {
  choices: ChatChoice[];
}

export interface ChatInput {
  label: string;
  value: string;
}

export async function generateChickenName(
  inputs: ChatInput[],
  history: string[]
): Promise<string> {
  const inputText = inputs
    .map(i => `${i.label}: ${i.value}`)
    .join('\n');

  const historyText = history.length
    ? `Avoid these names: ${history.join(', ')}\n\n`
    : '';

  const prompt = `
You are a playful, imaginative chicken namer. You prize creativity and uniqueness.
– Never repeat any name or word, even in the same name
– Use vivid adjectives, puns, alliteration, or rhymes to make names fun and memorable
– Occasionally use obscure words or references to add intrigue
${historyText}
Given these inputs, return exactly one 1–3 word name. Just reply with the name.
${inputText}
  `.trim();

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 12,
      temperature: 0.9,
    }),
  });

  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const data = (await res.json()) as ChatResponse;
  return data.choices[0].message.content.trim();
}