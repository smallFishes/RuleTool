/**
 * Created by hasee on 2018/7/31.
 */
//获取验证码
var code = document.getElementById("checkCode").innerText;
//注入验证码
document.getElementById("inputCode").value = code;

chrome.storage.local.get('role',function(result){
    var role = result.role;
    var url = window.location.href;
    var ip = url_split(url);
    var engine_ips = ["10.28.19.25","10.28.16.84","10.28.16.85"];
    var test_ips = ["10.28.7.25","10.28.3.15","10.28.3.18"];
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    if(role === "admin"){
        //生产
        if(isInArray(engine_ips,ip)){
            username.value = "admin";
        }//测试
        else if(isInArray(test_ips,ip)){
            username.value = "adminuat";
        }
    }else if(role === "zgs"){
        username.value = "2000000000";
        password.value = "";

    }else if(role === "beijing"){
        username.value = "2110000000";
        password.value = "";
    }
});

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
