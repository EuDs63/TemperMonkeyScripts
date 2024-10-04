// ==UserScript==
// @name         Copy Web Title and Url
// @namespace    http://ds63.eu.org
// @version      1.3
// @description  Copy Web Title and Url to clipboard when Alt + S is pressed.
// @include      *
// @grant        none
// ==/UserScript==

window.addEventListener("keydown", function (event) {
    if (event.altKey && event.key === "s") {
        event.preventDefault();

        copyToClipboard(getText());
    }
});

function copyToClipboard(text) {
    var dummyInput = document.createElement("input");
    document.body.appendChild(dummyInput);
    dummyInput.value = text;
    dummyInput.select();
    document.execCommand("copy");
    document.body.removeChild(dummyInput);
}

function getText() {
    var pageTitle = document.title;
    var currentUrl = window.location.href;

    // for bilibili.com
    if (currentUrl.indexOf("bilibili.com") != -1) {
        // check if the title ends with "_哔哩哔哩_bilibili"
        if (pageTitle.endsWith("_哔哩哔哩_bilibili")) {
            // delete the last 14 characters
            pageTitle = pageTitle.substring(0, pageTitle.length - 14);
        }

        // get rid of the query string
        currentUrl = currentUrl.split("?")[0];
    }

    // for youtube.com
    if (currentUrl.indexOf("youtube.com") != -1) {
        // check if the title begins with (number)
        if (pageTitle.match(/^\(\d+\)/)) {
            // delete the first (number)
            pageTitle = pageTitle.replace(/^\(\d+\)/, "");
        }
    }

    // for tieba.baidu.com
    if (currentUrl.indexOf("tieba.baidu.com") != -1) {
        // get rid of the query string
        currentUrl = currentUrl.split("?")[0];
    }

    // for x.com
    if (currentUrl.indexOf("x.com") != -1) {
        // twitter will make the title with the format "username on X: content"
        // I prefer to keep the beginning part only, that is "username on X"
        if (pageTitle.indexOf(":") != -1) {
            pageTitle = pageTitle.split(":")[0];
        }
    }

    // the " " is a patch for the stubid qq link parse
    var formattedText = `[${pageTitle}](${currentUrl} )`;

    return formattedText;
}