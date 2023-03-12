// APIキー
const apiKey = 'YOUR_API_KEY';

// コンテキストメニューに項目を追加する
chrome.contextMenus.create({
  title: 'ChatGPTで説明する',
  contexts: ['selection'],
  onclick: function (info, tab) {
    // 選択したテキストを取得
    const text = info.selectionText;
    
    // APIリクエストを作成
    const apiUrl = `https://api.openai.com/v1/engines/davinci-codex/completions?model=davinci-codex-2022-02-08&prompt=${encodeURIComponent(text)}&max_tokens=200&n=1&stop=</s>&format=text`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
    const requestOptions = {
      method: 'POST',
      headers: headers,
      redirect: 'follow'
    };
    
    // APIリクエストを送信
    fetch(apiUrl, requestOptions)
      .then(response => response.text())
      .then(result => {
        // レスポンスのテキストを表示
        alert(result);
      })
      .catch(error => console.log('error', error));
  }
});