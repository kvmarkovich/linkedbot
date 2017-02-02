// $.get(chrome.extension.getURL('/injected.js'),
// 	function(data) {
// 		var script = document.createElement("script");
// 		script.setAttribute("type", "text/javascript");
// 		script.innerHTML = data;
// 		document.getElementsByTagName("head")[0].appendChild(script);
// 		document.getElementsByTagName("body")[0].setAttribute("onLoad", "injected_main();");
// 	}
// );

var clickedEl = null;

document.addEventListener("mousedown", function (event) {
    //right click
    console.log("click");
    if (event.button == 2) {
        clickedEl = event.target;
    }
}, true);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request == "getClickedEl") {
        sendResponse({value: clickedEl.value});
    }
});