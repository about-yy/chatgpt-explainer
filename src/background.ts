
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
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("apiKey", (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        const apiKey = result.apiKey;
        if (apiKey) {
          resolve(apiKey);
        } else {
          reject(new Error("API key is not set."));
        }
      }
    });
  });
}


async function setApiKey(apiKey: string) {
  await chrome.storage.sync.set({ apiKey });
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'query') {
    try {
      const apiKey = await getApiKey();
      if (!apiKey) {
        throw new Error('APIキーが設定されていません');
      }
      const result = await queryGPT(message.text, message.model, apiKey);
      sendResponse(result);
    } catch (error: any) {
      sendResponse({ error: error.message });
    }
  }
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'setApiKey') {
    try {
      await setApiKey(message.apiKey);
      sendResponse({ success: true });
    } catch (error: any) {
      sendResponse({ error: error.message });
    }
  }
});
