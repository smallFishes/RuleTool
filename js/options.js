/**
 * Created by hasee on 2018/8/1.
 */
options = {
    "isAutoLogin":false
};

$(function(){
    chrome.storage.local.get('rule_options',function(result){
        if(result.rule_options){
            $("#isAutoLogin").attr("checked","checked");
        }
    });
});

$("#save").click(function(){
    options.isAutoLogin = $("#isAutoLogin").is(':checked');
    console.log(options)
    chrome.storage.local.set({rule_options: options});
});
