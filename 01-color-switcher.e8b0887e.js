const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body");let o=null;t.addEventListener("click",(function(){t.disabled=!0,o=setInterval((function(){n.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),e.addEventListener("click",(function(){clearInterval(o),t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.e8b0887e.js.map