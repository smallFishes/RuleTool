/**
 * Created by hasee on 2018/7/31.
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
        if(!result.rule_options){
            chrome.storage.local.set({rule_options: options});
        }
    });
});