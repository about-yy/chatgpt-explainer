import axios from "axios";

const form = document.querySelector("form")!;
const queryInput = document.getElementById("query") as HTMLInputElement;
const responseContainer = document.getElementById("response") as HTMLDivElement;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = queryInput.value.trim();
  if (!query) {
    return;
  }

  try {
    const response = await axios.get(
      `https://api.openai.com/v1/engines/davinci-codex/completions?prompt=${encodeURIComponent(
        query
      )}&max_tokens=150&n=1&stop=\\n`
    );
    const explanation = response.data.choices[0].text.trim();
    responseContainer.innerHTML = explanation;
  } catch (error) {
    console.error(error);
    responseContainer.innerHTML = "Sorry, an error occurred.";
  }
});
