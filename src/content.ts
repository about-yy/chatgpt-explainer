console.log("content script loaded");

// 選択されたテキストを取得する関数
function getSelectedText(): string | undefined {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    if (range && !range.collapsed) {
      return range.toString();
    }
  }
  return undefined;
}

// ポップアップを表示する関数
function showPopup(message: string, sel?: Selection|null) {
 
  const popup = document.createElement("div");
  popup.innerText = message;
  popup.style.position = "fixed";
  popup.style.background = "#fff";
  popup.style.border = "1px solid #ccc";
  popup.style.borderRadius = "5px";
  popup.style.padding = "10px";
  popup.style.zIndex = "99999";

  if(sel){
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    popup.style.left = `${rect.left }px`;
    popup.style.top = `${rect.bottom }px`;
  } else {
    popup.style.top = `${window.pageYOffset + 50}px`;
    popup.style.left = `${window.pageXOffset + 50}px`;
  }

  document.body.appendChild(popup);
  
  setTimeout(() => {
    popup.remove();
  }, 3000);
}


// テキストが選択されたら実行する関数
function handleSelection(): void {
  const selectedText = getSelectedText();
  const selection = window.getSelection();
  if (selectedText) {
    if (selectedText && selectedText.length > 0) {
      chrome.runtime.sendMessage({action: "query", query: selectedText}, (result)=> {
        if (result) {
          showPopup(result, window.getSelection());
        } else {
          if(result.error == "APIキーが設定されていません") {
            showPopup(result.error, window.getSelection());
          } else {
            showPopup('エラーが発生しました', window.getSelection());
          }
        }
      })      
    }
  }
}



// テキストが選択されたらhandleSelectionを実行するようにする
document.addEventListener('mouseup', handleSelection);
document.addEventListener('touchend', handleSelection);