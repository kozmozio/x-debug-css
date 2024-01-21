// background.js
var toggle = true;
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['x-debug.js']
  }, () => {
    chrome.tabs.sendMessage(tab.id, { toggleCss: !toggle });
  });
});