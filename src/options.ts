import { browser } from "webextension-polyfill-ts";
const apiKeyInput = document.getElementById('api-key') as HTMLInputElement;
const saveButton = document.getElementById('save') as HTMLButtonElement;
const messageElement = document.getElementById('message') as HTMLParagraphElement;

async function saveApiKey() {
  const apiKey = apiKeyInput.value;
  try {
    await browser.runtime.sendMessage({action: 'setApiKey', apiKey});
    messageElement.textContent = "API_KEY saved !!";
  } catch (error: any) {
    messageElement.textContent = "API_KEYの保存に失敗しました。";
  }
}

saveButton.addEventListener('click', saveApiKey);
