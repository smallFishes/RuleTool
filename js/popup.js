/**
 * Created by hasee on 2018/7/31.
 */
$('#open_url_new_tab_uat_new').click(function () {
    role_select();
    chrome.tabs.create({url: 'http://10.28.3.15:7011/groupama-new/index.do'});
});

$('#open_url_new_tab_engine_new').click(function () {
    role_select();
    chrome.tabs.create({url: 'http://10.28.16.84:7011/groupama-new/index.do'});
});

$('#open_url_new_tab_rts_test').click(function () {
    chrome.tabs.create({url: 'http://10.28.3.15:7001/teamserver'});
});

$('#open_url_new_tab_rts_engine').click(function () {
    chrome.tabs.create({url: 'http://10.28.16.83:7009/teamserver'});
});

function role_select() {
    var role_name = $("#role_select option:selected").val();
    chrome.storage.local.set({role: role_name});
}

$(".github").hover(function(){
    $(".github img").attr("src","img/github-c.png");
});

$(".github").mouseleave(function(){
    $(".github img").attr("src","img/github.png");
});

$(".setting").click(function(){
    chrome.runtime.openOptionsPage(function(res){})
});