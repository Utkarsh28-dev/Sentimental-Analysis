// Include the VADER script directly in the HTML file or as a separate JS file
importScripts('libs/vaderSentiment.js');

document.getElementById('analyzeBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "extractText" }, (response) => {
      if (response && response.text) {
        analyzeSentiment(response.text);
      } else {
        document.getElementById('result').innerText = "Failed to extract text.";
      }
    });
  });
});

function analyzeSentiment(text) {
  // Use the VADER sentiment analysis tool
  const analyzer = new vaderSentiment.SentimentIntensityAnalyzer();
  const sentiment = analyzer.polarity_scores(text);

  document.getElementById('result').innerHTML = `
    <p>Positive: ${sentiment.pos}</p>
    <p>Neutral: ${sentiment.neu}</p>
    <p>Negative: ${sentiment.neg}</p>
    <p>Compound: ${sentiment.compound}</p>
  `;
}
