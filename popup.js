document.addEventListener('DOMContentLoaded', function () {

    var debugCssCheckbox = document.getElementById('debug-css');
    var debugOutlinedCheckbox = document.getElementById('debug-outlined');
  
    debugCssCheckbox.addEventListener('change', function () {
        console.log("debugOutlinedCheckbox");
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { toggleCss: debugCssCheckbox.checked });
      });
    });
  
    debugOutlinedCheckbox.addEventListener('change', function () {
        console.log("debugOutlinedCheckbox");
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { toggleOutlined: debugOutlinedCheckbox.checked });
      });
    });




  });
  

