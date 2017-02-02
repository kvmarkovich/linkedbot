// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var messages;

function getMessages(callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };
    xhr.open("GET", chrome.extension.getURL('/conf/messages.json'), true);
    xhr.send();
}

// The onClicked callback function.
function onClickHandler(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));


    chrome.tabs.sendMessage(tab.id, "getClickedEl", function (clickedEl) {
        console.log("value: " + clickedEl.value);
    });
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function () {
    function callback(config) {
        messages = config.messages;

        // console.log(config)
        const context = "editable";

        for (var i in  config.messages) {
            const message = config.messages[i];
            // console.log(config.messages[i]);
            chrome.contextMenus.create({"title": message.messageName, "id": message.messageId, "contexts": [context]});
        }
        // Create a parent item and two children.
        // chrome.contextMenus.create({"title": "Test parent item", "id": "parent"});
        // chrome.contextMenus.create(
        //     {"title": "Child 1", "parentId": "parent", "id": "child1"});
        // chrome.contextMenus.create(
        //     {"title": "Child 2", "parentId": "parent", "id": "child2"});
        // console.log("parent child1 child2");
    }

    getMessages(callback);
});



