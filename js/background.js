/**
 * Created by hasee on 2018/7/31.
 */
//初始化数据
$(function(){
    chrome.storage.local.get('rule_options',function(result){
        //读取默认配置
        if(!result.rule_options){
            $.getJSON("../json/config.json",function(data){
                chrome.storage.local.set({rule_options: data});
            });
        }else{
            //判断版本号
            $.getJSON("../json/config.json",function(data){
                var now_version = data.version;
                var local_version = result.rule_options.version;
                if(now_version != local_version){
                    //若版本号有变动，则加载最新配置
                    var new_options = $.extend(true,data,result.rule_options);
                    new_options.version = now_version;
                    chrome.storage.local.set({rule_options: new_options});
                }
            });
        }
    });
});

chrome.contextMenus.create({
    title: "获取查询SQL",
    documentUrlPatterns:[
        "http://*/groupama/*",
        "http://*/groupama-new/*",
        "http://localhost:9999/web/*",
        "http://127.0.0.1:9999/web/*"
    ],
    onclick: function (t, n,) {
        chrome.tabs.executeScript(n.id,{file: "js/menu.js", allFrames: true})
    }
});