/**
 * Created by hasee on 2018/7/31.
 */
chrome.storage.local.get('rule_options',function(result){
    //生成列表
   if(result.rule_options.website.uat_site){
       $("#sites").append("<li class=\"uat-new\"><b></b><a href=\"#\" id=\"open_url_new_tab_uat_new\">测试系统规则平台</a></li>");
   }
    if(result.rule_options.website.engine_site){
        $("#sites").append("<li class=\"engine-new\"><b></b><a href=\"#\" id=\"open_url_new_tab_engine_new\">生产系统规则平台</a></li>");
    }

    if(result.rule_options.website.uat_rts){
        $("#sites").append("<li class=\"uat-rts\"><b></b><a href=\"#\" id=\"open_url_new_tab_rts_test\">测试TeamServer</a></li>");
    }

    if(result.rule_options.website.engine_rts){
        $("#sites").append("<li class=\"engine-rts\"><b></b><a href=\"#\" id=\"open_url_new_tab_rts_engine\">生产TeamServer</a></li>");
    }

    for(var i=0; i<result.rule_options.webset.length; i++) {
        var item = result.rule_options.webset[i];
        var customizeAddress = result.rule_options.customizeAddress[i];
        if(item.auto_site) {
            $("#sites").append('<li class="engine-rts"><b></b><a href="#" id="auto_click_address_id_'+item.id+'">'+customizeAddress.showname+'</a></li>');
            $("#auto_click_address_id_"+item.id).click(function () {
                chrome.tabs.create({url: customizeAddress.address});
            });
        }
    }

    //绑定事件
    $('#open_url_new_tab_uat_new').click(function () {
        chrome.tabs.create({url: 'http://10.28.3.15:7011/groupama-new/login.do'});
    });

    $('#open_url_new_tab_engine_new').click(function () {
        chrome.tabs.create({url: 'http://10.28.16.84:7011/groupama-new/login.do'});
    });

    $('#open_url_new_tab_rts_test').click(function () {
        chrome.tabs.create({url: 'http://10.28.3.15:7001/teamserver'});
    });

    $('#open_url_new_tab_rts_engine').click(function () {
        chrome.tabs.create({url: 'http://10.28.16.83:7009/teamserver'});
    });
});


$(".github").hover(function(){
    $(".github>a>img").attr("src","img/github-c.png");
});

$(".github").mouseleave(function(){
    $(".github>a>img").attr("src","img/github.png");
});

$(".setting").click(function(){
    chrome.runtime.openOptionsPage(function(res){})
});

$(".setting").hover(function(){
    $(".setting>img").attr("src","img/setting-c.png");
});

$(".setting").mouseleave(function(){
    $(".setting>img").attr("src","img/setting.png");
});
$(".feedback").hover(function(){
    $(".feedback img").attr("src","img/feedback-c.png");
});

$(".feedback").mouseleave(function(){
    $(".feedback img").attr("src","img/feedback.png");
});