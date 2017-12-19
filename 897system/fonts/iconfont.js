(function(window){var svgSprite='<svg><symbol id="icon-shangcheng" viewBox="0 0 1024 1024"><path d="M980.045824 855.595008l-40.124416-708.124672c-3.209216-56.624128-52.706304-101.906432-110.600192-101.906432L197.095424 45.563904c-57.890816 0-107.388928 45.282304-110.598144 101.906432L46.372864 855.595008C42.4704 924.45184 92.101632 981.123072 157.2864 981.123072l711.844864 0C934.316032 981.123072 983.947264 924.45184 980.045824 855.595008zM846.334976 918.53824l-665.64096 0c-43.13088 0-76.25216-37.301248-73.99936-82.857984l33.266688-661.215232c1.878016-37.998592 34.885632-68.527104 73.735168-68.527104L813.27104 105.93792c38.851584 0 71.858176 30.527488 73.741312 68.527104l33.313792 661.215232C922.582016 881.236992 889.467904 918.53824 846.334976 918.53824z"  ></path><path d="M772.483072 273.025024c0.019456-0.412672 0.031744-0.827392 0.031744-1.24416 0-14.62784-12.133376-26.49088-27.101184-26.49088-14.966784 0-27.098112 11.862016-27.098112 26.49088 0 1.200128 0.089088 2.378752 0.247808 3.536896-5.572608 113.683456-95.967232 204.08832-206.70464 204.08832-111.085568 0-201.708544-90.976256-206.758912-205.166592 0.068608-0.764928 0.109568-1.538048 0.109568-2.320384 0-14.552064-12.068864-26.35264-26.957824-26.35264s-26.957824 11.800576-26.957824 26.35264c0 0.370688 0.013312 0.739328 0.028672 1.106944l-0.562176 0c4.965376 145.174528 119.952384 261.286912 261.097472 261.286912 141.147136 0 256.13312-116.112384 261.09952-261.286912L772.483072 273.026048z"  ></path></symbol><symbol id="icon-guanli" viewBox="0 0 1024 1024"><path d="M382.89 284.549c0-82.045-66.641-148.351-148.35-148.351-82.045 0-148.351 66.64-148.351 148.351 0 39.851 15.74 76.017 41.524 102.808-7.032 29.133-10.715 59.608-10.715 91.086 0 141.318 74.342 264.888 185.856 334.208l29.804-121.896c-60.611-50.901-99.123-127.253-99.123-212.312 0-15.404 1.339-30.809 3.683-45.543 80.371-1.339 145.672-66.976 145.672-148.351zM510.144 201.5c51.235 0 99.458 14.065 140.647 38.175-6.361 16.744-10.045 34.828-10.045 53.581 0 82.045 66.639 148.351 148.35 148.351s148.35-66.64 148.35-148.351c0-81.709-66.303-148.015-148.35-148.015-19.088 0-37.506 3.683-54.584 10.381-63.627-44.204-140.984-70.324-224.704-70.324-56.595 0-110.509 12.055-159.066 33.487l67.98 98.453c28.799-10.381 59.609-15.738 91.422-15.738z m276.608 289.668c-4.354 101.132-62.957 187.867-147.348 232.405-24.445-48.223-74.676-81.041-132.275-81.041-82.044 0-148.35 66.642-148.35 148.352 0 81.709 66.641 148.351 148.35 148.351 61.617 0 114.193-37.507 136.965-90.751 151.365-54.922 259.529-199.922 259.529-370.041 0-8.707-0.334-17.414-1.004-26.121l-115.867 38.846z"  ></path></symbol><symbol id="icon-zhibo" viewBox="0 0 1053 1024"><path d="M935.176905 205.710255H691.608906l132.493348-99.370011a58.44358 58.44358 0 1 0-70.068598-93.477879L526.071845 183.813818 298.110033 12.862365a58.44358 58.44358 0 1 0-70.148221 93.477879L360.45516 205.710255H116.88716A116.88716 116.88716 0 0 0 0 322.597415v584.515425a116.88716 116.88716 0 0 0 116.88716 116.88716h818.289745a116.88716 116.88716 0 0 0 116.887161-116.88716V322.597415a116.88716 116.88716 0 0 0-116.887161-116.88716zM710.718523 647.938653L457.834585 816.501404c-26.912711 17.915266-48.729525 6.051379-48.729524-25.718361v-350.342987c0-31.849362 21.896437-43.633627 48.729524-25.71836l252.883938 168.244257c26.912711 17.915266 26.753464 47.057433 0 64.9727z" fill="" ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)