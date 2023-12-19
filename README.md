# X Debug CSS

 This is a CSS debugger tool for visual abstraction of DOM elements of the current HTML page.

 We have been using this tool for every web project, and find it very useful for frontend development.


 **JS Version is all included** with necesarry CSS styles and code.

  **Keyboard Controls:**

  **Shift + D :** Enables blueprint debugger

  **Shift + X :** Enables outlined debugger

  Twitter login section sample :

  <img src="https://github.com/kozmozio/x-debug-css/blob/main/sample-twitter-login.png?raw=true" width="300"/>


## Three ways to use:


  1. **Include JS :**

  Add x-debug-css.js to your project scripts (Recommended)

  ~~~
  <script src="./x-debug-css.js" type="text/javascript" language="javascript"></script>
  ~~~

  Use it for project development with ease

  2. **Include CSS**
  
  Add x-debug-css.css to your project styles

  ~~~
    <link href="./x-debug-css.css" rel="stylesheet" />
  ~~~

 Needs to add and remobe .x-debug-css class to your body style manually.


  3. **Use bookmarklet**

    Use as bookmarklet on your Chrome toolbar. Click and inspect any website!

    - Save bookmark.html to your computer and open.
    - Bookmark this local page ( file may be  delete later )
    - Copy link address on text [javascript:var style=document.createElement('style');style.innerHTML=` .debug-css :not(g):not(path){color: hsla(210, 80%, 100%, 0.9) !important; background: hsla(210, 80%, 50%, 0.5) !important; outline: solid 0.125rem hsla(210, 80%, 100%, 0.5) !important; box-shadow: none !important; filter: none !important;}.debug-css-outlined :not(g):not(path){outline: 1px solid red !important;; box-shadow: none !important; filter: none !important;}`;document.head.appendChild(style);document.documentElement.classList.toggle('debug-css');](x-debugCSS)  right mouse click
    - Edit your bookmark in Chrome and change URL with copied link URL 
    - Save and close.
    
    Your x-debugCSS bookmarklet is ready 🖖🏼

    Click [bookmark] for any page you want to X Debug CSS layout.



Project is derived and utilized from @zaydek's debug-css library.
