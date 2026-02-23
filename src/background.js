const messages = ["showGuides", "hideGuides"]; 

chrome.runtime.onMessage.addListener(({ message }, sender, sendResponse) => {
  if (messages.includes(message)) {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(({ id }) => {
        chrome.tabs.sendMessage(id, { message });
      });
    });
  }
  return true; // Required for async response
});