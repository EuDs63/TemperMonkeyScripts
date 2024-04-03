// ==UserScript==
// @name         Copy Web Title and Url
// @namespace    http://ds63.eu.org
// @version      1.2
// @description  Copy Web Title and Url to clipboard when Alt + S is pressed.
// @include      *
// @grant        none
// ==/UserScript==

// 监听键盘事件
window.addEventListener("keydown", function(event) {
    // 检查是否按下Alt键（event.altKey）和S键（event.key === "s"）
    if (event.altKey && event.key === "s") {
        // 阻止默认行为，防止复制操作
        event.preventDefault();

        // 复制特殊文本到剪贴板
        copyToClipboard(getText());
    }
});

// 复制文本到剪贴板的函数
function copyToClipboard(text) {
    var dummyInput = document.createElement("input");
    document.body.appendChild(dummyInput);
    dummyInput.value = text;
    dummyInput.select();
    document.execCommand("copy");
    document.body.removeChild(dummyInput);
}

// 得到网站标题和网址
function getText(){
    var pageTitle = document.title;
    var currentUrl = window.location.href;
    // 对得到的网址进行处理
    // 如果是b站的链接，
    if(currentUrl.indexOf("bilibili.com") != -1){
        // 判断是否有_哔哩哔哩_bilibili
        if (pageTitle.endsWith("_哔哩哔哩_bilibili")){
            // 删去title最后的"_哔哩哔哩_bilibili"
            pageTitle = pageTitle.substring(0, pageTitle.length - 14);
        }
        
        //截去后面的参数
        currentUrl = currentUrl.split("?")[0];
    }

    var formattedText = `[${pageTitle}](${currentUrl})`;

    return formattedText;
}
