// CSS Sytles
var style = document.createElement('style');
style.innerHTML = `
    .x-debug-css :not(g):not(path)  {
  	color:                 hsla(210, 100%, 100%, 0.9) !important;
  	background:            hsla(210, 100%,  50%, 0.5) !important;
  	outline: solid 0.15rem hsla(210, 100%, 100%, 0.5) !important;
  	box-shadow: none !important;
  	filter:     none !important;

}
.x-debug-css-outlined :not(g):not(path){
    outline: 0.75px solid red !important;
    box-shadow: none !important;
    filter: none !important;
  }
  

  
  `;

// Add styles to docuöent head
document.head.appendChild(style);


// Key listener
document.onkeydown = function (event) {
  event = event || window.event;
  if (event.code === 'KeyC' && event.shiftKey === true ) {
        document.documentElement.classList.toggle("x-debug-css");
  }else  if (event.code === 'KeyX' && event.shiftKey === true ) {
    document.documentElement.classList.toggle("x-debug-css-outlined");
  }
}

// x-debug.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
 console.log("x-debug.js", request);
 console.log("sender", sender);
  
 if (request.toggleCss === true  ) { 
    document.documentElement.classList.add("x-debug-css");
  }else{
    document.documentElement.classList.remove("x-debug-css");
  }
  
  if (request.toggleOutlined === true){ 
    document.documentElement.classList.add("x-debug-css-outlined");
  }else{  
    document.documentElement.classList.remove("x-debug-css-outlined");
  } 

  if (request.enableShortcuts === true){ 


  }else{  
    document.onkeydown = null;
  } 

  


});