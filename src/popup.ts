const getSelectedText = () => {
    const selection = window.getSelection();
    return selection.toString().trim();
  };
  
  const setDescription = (description) => {
    const descriptionElement = document.getElementById('description');
    descriptionElement.textContent = description;
  };
  
  const requestDescription = (text) => {
    const apiKey = 'YOUR_API_KEY_HERE';
    const endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';
    const prompt = `Please describe "${text}".`;
    const data = JSON.stringify({
      prompt,
      max_tokens: 128,
      temperature: 0.7,
      n: 1,
      stop: '\n'
    });
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    });
    const options = {
      method: 'POST',
      headers,
      body: data
    };
    return fetch(endpoint, options)
      .then(response => response.json())
      .then(data => data.choices[0].text.trim());
  };
  
  const handleSelectedText = () => {
    const text = getSelectedText();
    if (text.length > 0) {
      requestDescription(text)
        .then(setDescription)
        .catch(console.error);
    }
  };
  
  document.addEventListener('mouseup', handleSelectedText);