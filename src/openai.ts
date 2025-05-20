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
You are a playful, imaginative chicken-naming assistant. You prize creativity and uniqueness.
– Never repeat any name or word from the “Avoid these names” list.
– Use vivid adjectives, puns, alliteration, or rhymes (e.g. “Sunny Scramble,” “Cluck Norris”).
– About once every 6–8 runs, instead of a whimsical chicken name, include a short human name (e.g. Harriet, Albert).
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