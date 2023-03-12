import { browser } from 'webextension-polyfill-ts';

const API_ENDPOINT = 'https://api.openai.com/v1/';

async function queryGPT(text: string, model: string, apiKey: string) {
  const response = await fetch(`${API_ENDPOINT}engines/${model}/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: text,
      max_tokens: 50,
      n: 1,
      stop: '\n',
    })
  });
  const result = await response.json();
  return result.choices[0].text.trim();
}

async function getApiKey(): Promise<string> {
  const result = await browser.storage.sync.get("apiKey");
  return result.apiKey;
}

async function setApiKey(apiKey: string) {
  await browser.storage.sync.set({ apiKey });
}

browser.runtime.onMessage.addListener(async (message, sender) => {
  if (message.action === 'query') {
    try {
      const apiKey = await getApiKey();
      if (!apiKey) {
        throw new Error('APIキーが設定されていません');
      }
      const result = await queryGPT(message.text, message.model, apiKey);
      return result;
    } catch (error: any) {
      return { error: error.message };
    }
  }

  if (message.type === 'setApiKey') {
    try {
      await setApiKey(message.apiKey);
      return { success: true };
    } catch (error: any) {
      return { error: error.message };
    }
  }
});