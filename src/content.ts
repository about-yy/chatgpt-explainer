console.log('ChatGPT Explainer Content Script loaded');

// メッセージを受け取ったら、ポップアップを表示する
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'selection_text') {
    chrome.runtime.sendMessage({type: 'show_popup', text: message.text});
  }
});
