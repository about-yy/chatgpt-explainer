console.log('ChatGPT Explainer Background Script loaded');

// ポップアップを表示する
function showPopup(text: string) {
  chrome.browserAction.setPopup({popup: 'popup.html'});
  chrome.runtime.sendMessage({type: 'popup_content', text: text});
}

// メッセージを受け取ったら、ポップアップを表示する
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'show_popup') {
    showPopup(message.text);
  }
});
