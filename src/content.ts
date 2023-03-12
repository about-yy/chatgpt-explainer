// メッセージ受信時に呼ばれるリスナー
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // ページ内で選択したテキストを取得する
    const selection = window.getSelection().toString();
  
    // 選択されたテキストがあればChatGPTにリクエストを送信する
    if (selection) {
      // ChatGPTにリクエストを送信する
      fetch(`https://api.openai.com/v1/engines/davinci-codex/completions?prompt=${encodeURIComponent(selection)}&max_tokens=150`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      })
        .then(response => response.json())
        .then(data => {
          // ChatGPTからのレスポンスをbackground.jsに送信する
          chrome.runtime.sendMessage({ action: 'showResponse', data });
        })
        .catch(error => console.error(error));
    }
  });