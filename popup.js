document.addEventListener('DOMContentLoaded', function () {

    var debugCssCheckbox = document.getElementById('debug-css');
    var debugOutlinedCheckbox = document.getElementById('debug-outlined');
    var enableShortcutsCheckbox = document.getElementById('enable-shortcuts');

    // remember user selction from local storage and set checkbox accordingly
    chrome.storage.local.get(['debugCss', 'debugOutlined', 'enableShortcuts'], function (result) {
      if(result.hasOwnProperty('debugCss')) {
        debugCssCheckbox.checked = result.debugCss;
      }
      if(result.hasOwnProperty('debugOutlined')) {
        debugOutlinedCheckbox.checked = result.debugOutlined;
      }
      // if(result.hasOwnProperty('enableShortcuts')) {
      //   enableShortcutsCheckbox.checked = result.enableShortcuts;
      // }
    });
    
    debugCssCheckbox.addEventListener('change', function () {
        console.log("toggleCss");
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

        //        set local storage
        chrome.storage.local.set({ debugCss: debugCssCheckbox.checked });

        chrome.tabs.sendMessage(tabs[0].id, { toggleCss: debugCssCheckbox.checked });
      });
    });
  
    debugOutlinedCheckbox.addEventListener('change', function () {
        console.log("debugOutlinedCheckbox",this.checked);
        console.log("debugOutlinedCheckbox",this);
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { toggleOutlined: debugOutlinedCheckbox.checked });
      });
    });



    enableShortcutsCheckbox.addEventListener('change', function () {
      console.log("enableShortcuts");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { enableShortcuts: debugCssCheckbox.checked });
    });
  });


  });
  

