/**
 * Created by hasee on 2018/8/1.
 */
options = {
    "login_setting":{
        "uat":{
            "username":"adminuat",
            "password":"admin_engine",
            "isAutoLogin":false,
            "isAutoCode":true
        },
        "engine":{
            "username":"admin",
            "password":"admin_engine",
            "isAutoLogin":false,
            "isAutoCode":true
        }
    },
    "website":{
        "uat_site":true,
        "engine_site":true,
        "uat_rts":false,
        "engine_rts":false
    }
};

$(function(){
    chrome.storage.local.get('rule_options',function(result){
        if(result.rule_options){
            //已有配置则加载
           loadOptions(result.rule_options);
        }else{
            //设置默认配置
            chrome.storage.local.set({rule_options: options});
            loadOptions(options);
        }
    });
});

$("#save").click(function(){
    options.login_setting.uat.username = $("#username-test").val();
    options.login_setting.uat.password = $("#password-test").val();
    options.login_setting.uat.isAutoCode = $("#isAutoCode-test").is(':checked');
    options.login_setting.uat.isAutoLogin = $("#isAutoLogin-test").is(':checked');

    options.login_setting.engine.username = $("#username-engine").val();
    options.login_setting.engine.password = $("#password-engine").val();
    options.login_setting.engine.isAutoCode = $("#isAutoCode-engine").is(':checked');
    options.login_setting.engine.isAutoLogin = $("#isAutoLogin-engine").is(':checked');

    options.website.uat_site = $("#uat-new-ch").is(':checked');
    options.website.engine_site = $("#engine-new-ch").is(':checked');
    options.website.uat_rts = $("#uat-rts-ch").is(':checked');
    options.website.engine_rts = $("#engine-rts-ch").is(':checked');
    chrome.storage.local.set({rule_options: options},function(){
        chrome.notifications.create(null, {
            type: 'basic',
            iconUrl: 'img/success.png',
            title: '提示',
            message: '保存成功'
        });
    });

});

$("#cancel").click(function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if(tabs.length){
            chrome.tabs.remove(tabs[0].id, function(){})
        }
    });

});

function loadOptions(rule_options){
    $("#username-test").val(rule_options.login_setting.uat.username);
    $("#password-test").val(rule_options.login_setting.uat.password);
    $("#isAutoCode-test").attr("checked",rule_options.login_setting.uat.isAutoCode);
    $("#isAutoLogin-test").attr("checked",rule_options.login_setting.uat.isAutoLogin);

    $("#username-engine").val(rule_options.login_setting.engine.username);
    $("#password-engine").val(rule_options.login_setting.engine.password);
    $("#isAutoCode-engine").attr("checked",rule_options.login_setting.engine.isAutoCode);
    $("#isAutoLogin-engine").attr("checked",rule_options.login_setting.engine.isAutoLogin);

    $("#uat-new-ch").attr("checked",rule_options.website.uat_site);
    $("#engine-new-ch").attr("checked",rule_options.website.engine_site);
    $("#uat-rts-ch").attr("checked",rule_options.website.uat_rts);
    $("#engine-rts-ch").attr("checked",rule_options.website.engine_rts);
}