// ==UserScript==
// @name         自动跳转链接
// @namespace    https://ds63.eu.org/
// @version      1.0
// @description  当检测到跳转提示页面时，自动跳转
// @author       EuDs63
// @match        https://link.juejin.cn/*
// @match        https://sspai.com/*
// @match        https://music.163.com/*
// @match        https://afdian.net/*
// @match        https://link.zhihu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 获取当前页面的 URL
    const currentUrl = window.location.href;

    if (currentUrl.startsWith('https://link.juejin.cn/') || currentUrl.startsWith('https://sspai.com/link?')
        || currentUrl.startsWith('https://afdian.net/link?')|| currentUrl.startsWith('https://link.zhihu.com/?target=')) {
        // 获取原始链接
        const originalUrl = decodeURIComponent(new URLSearchParams(window.location.search).get('target'));

        if (originalUrl) {
            // 跳转到原始链接
            window.location.href = originalUrl;
        }
    }
    else if (currentUrl.match(/^https:\/\/music\.163\.com\/#\/playlist\?id=\d+/)) {
// 检查是否已经执行过
        const hasExecuted = localStorage.getItem('hasExecuted');

        if (!hasExecuted) {
            // 执行指定的命令，这里使用正则表达式匹配包含不同 id 参数的 URL
            document.cookie = "os=pc";

            // 标记已执行
            localStorage.setItem('hasExecuted', 'true');
        }
    }
})();
