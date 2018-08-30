/**
 * Created by hasee on 2018/7/31.
 */
//读取配置
var options = null;
var engine_ips = ["10.28.19.25","10.28.16.84","10.28.16.85"];
var test_ips = ["10.28.7.25","10.28.3.15","10.28.3.18"];
var local_ips = ["127.0.0.1","localhost"];
chrome.storage.local.get('rule_options',function(result){
    options = result.rule_options;

    var url = window.location.href;
    var ip = url_split(url);
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    //生产
    if(isInArray(engine_ips,ip)){
        username.value = options.login_setting.engine.username;
        password.value = options.login_setting.engine.password;
        if(options.login_setting.engine.isAutoCode){
            autoCode();
            if(options.login_setting.engine.isAutoLogin){
                document.getElementById("login").click();
            }
        }

    }//测试
    else if(isInArray(test_ips,ip)){
        username.value = options.login_setting.uat.username;
        password.value = options.login_setting.uat.password;
        if(options.login_setting.uat.isAutoCode){
            autoCode();
            if(options.login_setting.uat.isAutoLogin){
                document.getElementById("login").click();
            }
        }
    }//本地
    else if(isInArray(local_ips,ip)){
        autoCode();
    }
});


function autoCode(){
    //获取验证码
    var code = document.getElementById("checkCode").innerText;
    //注入验证码
    document.getElementById("inputCode").value = code;
}

function isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
        if(value === arr[i]){
            return true;
        }
    }
    return false;
}

function url_split(url){
    var p1 = url.split("/");
    var p2 = p1[2].split(":");
    return p2[0];
}
