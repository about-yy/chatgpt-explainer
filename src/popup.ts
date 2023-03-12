document.addEventListener("DOMContentLoaded", () => {
  console.log("popup script loaded");
});

// 入力フォームを取得
const apiKeyInput = document.getElementById("api-key-input") as HTMLInputElement;
const apiKeyForm = document.getElementById("api-key-form") as HTMLFormElement;

// 保存されているAPIキーを取得してフォームに設定
getApiKey((apiKey) => {
  if (apiKey) {
    apiKeyInput.value = apiKey;
  }
});

// フォームが送信されたらAPIキーを保存
apiKeyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const apiKey = apiKeyInput.value.trim();
  if (apiKey) {
    setApiKey(apiKey, () => {
      alert("APIキーが保存されました。");
    });
  } else {
    alert("APIキーを入力してください。");
  }
});


// APIキーが設定されているかどうかを確認
getApiKey((apiKey) => {
  if (!apiKey) {
    console.error("APIキーが設定されていません。");
    alert("APIキーを設定してください。");
  }
});
