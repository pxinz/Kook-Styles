// ==UserScript==
// @name         Free Kook Style
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Free styles for kook app
// @author       pxinz
// @match        https://www.kookapp.cn/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kookapp.cn
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    var settings = {}
    // 储存设置函数
    function saveSettings() {
        window.localStorage["free-kook-style"] = JSON.stringify(settings);
    }
    // 获取设置
    if (window.localStorage["free-kook-style"]) {
        settings = JSON.parse(window.localStorage["free-kook-style"]);
    } else {
        settings = {
            "on": true,
            "url": "https://pxinz.github.io/Kook-Styles/styles/test-style.css"
        }
        saveSettings()
    }
    // 加载样式表函数
    function setStyleSheet(link) {
        var head = document.getElementsByTagName("head")[0];
        try {
            head.getElementsByClassName("free-kook-style")[0].href = link;
            return;
        } catch (err) {}
        var new_css = document.createElement("link");
        new_css.setAttribute("href", link);
        new_css.setAttribute("rel", "stylesheet");
        new_css.setAttribute("class", "free-kook-style");
        document.getElementsByTagName("head")[0].appendChild(new_css);
    }
    // 设置函数
    function setStyle() {
        if (settings.on) {
            // 启用了功能
            if (confirm("免费Kook样式已启用, 是否需要关闭?")) {
                // 关闭功能
                settings.on = false;
                settings_choice.innerHTML = "免费样式设置(未启用)"
                saveSettings();
                alert("已关闭功能, 感谢您的使用!")
            } else {
                // 设置功能
                var styleSheet = prompt("请输入要更改的样式表url: ",settings.url)
                if (styleSheet == "") {
                    alert("不能输入空url!");
                } else if (styleSheet != null) {
                    settings.url = styleSheet;
                    saveSettings();
                    alert("设置成功!");
                }
            }
        } else {
            // 未启用功能
            if (confirm("免费Kook样式未启用, 是否需要启用?")) {
                // 启用功能
                settings.on = true;
                settings_choice.innerHTML = "免费样式设置(已启用)"
                saveSettings();
                alert("已启用功能, 感谢您的使用!")
            }
        }
    }
    // 绑定设置UI
    if (document.URL == "https://www.kookapp.cn/" || document.URL == "http://www.kookapp.cn/") {
        var settings_choice = document.createElement("a");
        if (settings.on) {
            settings_choice.innerHTML = "免费样式设置(已启用)"
        } else {
            settings_choice.innerHTML = "免费样式设置(未启用)"
        }
        settings_choice.classList = ["header-nav"]
        settings_choice.onclick = setStyle;
        document.getElementsByClassName("header-left")[0].appendChild(settings_choice);
    }
    // 加载样式表
    if (settings.on) {
        setStyleSheet(settings.url);
    }
})();