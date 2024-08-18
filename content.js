chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extractText") {
      const pageText = document.body.innerText;
      sendResponse({ text: pageText });
    }
  });
  