console.log("content script loaded");

document.addEventListener("mouseup", () => {
  const selection = window.getSelection()?.toString().trim();
  if (selection && selection.length > 0) {
    chrome.runtime.sendMessage({action: "query", query: selection}, response => {
      const popup = document.createElement("div");
      popup.setAttribute("id", "chatgpt-explainer-popup");
      popup.innerHTML = response;
      document.body.appendChild(popup);
    });
  }
});

document.addEventListener("mousedown", () => {
  const popup = document.getElementById("chatgpt-explainer-popup");
  if (popup) {
    popup.remove();
  }
});

