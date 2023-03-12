console.log("background script loaded");
const API_KEY = "YOUR_API_KEY";
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "query") {
    fetch(`https://api.openai.com/v1/engines/davinci-codex/completions?prompt=${request.query}&max_tokens=1024&n=1&stop=%5B%22%5Cn%22%5D`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      sendResponse(data.choices[0].text);
    })
    .catch(error => console.error(error));
    return true;
  }
});
