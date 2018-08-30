/**
 * 页面加载执行
 */
$(function(){
    initialize();
});

/**
 * 初始化页面数据
 */
function initialize() {
    chrome.storage.local.get('rule_options',function(result){
        loadOptions(result.rule_options);
    });
}

/**
 * 显示所有网址修改表格
 */
function showSetAddressAll(options) {
    $.each(options.customizeAddress, function (i, item) {
        showSetAddress(item.id, item);
    });
}

/**
 * 显示单个网址修改表格
 * @param i
 * @param item
 */
function showSetAddress(i, item) {
    var fieldset =
            '<fieldset>'+
                '<legend>'+item.showname+'</legend>'+
                '<table>'+
                    '<tr>'+
                        '<td>显示名称</td>'+
                        '<td><input type="text" id="showname_auto_id_'+i+'" value="'+item.showname+'"></td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>访问网址</td>'+
                        '<td><input type="text" id="address_auto_id_'+i+'" value="'+item.address+'"></td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td><button id="save_auto_id_'+i+'" class="save">保存设置</button></td>'+
                        '<td><button id="delete_auto_id_'+i+'" class="delete">删除地址</button></td>'+
                    '</tr>'+
                '</table>'+
            '</fieldset>';
    $("#showAddress").before(fieldset);
}

/**
 * 显示所有网址展示列表
 */
function showCustomizeAddressAll(options) {
    $.each(options.customizeAddress, function (i, item) {
        $.each(options.webset, function (j, webSet) {
            if(item.id == webSet.id) {
                showCustomizeAddress(item.id, item, webSet);
            }
        })
    });
}

/**
 * 显示单个网址展示列表
 * @param i
 * @param data
 * @param webSet
 */
function showCustomizeAddress(i, data, webSet) {
    console.log("showCustomizeAddress", webSet)
    var tr =
        '<tr>'+
            '<td><input type="checkbox" id="auto_customize_id_'+i+'" '+(webSet.auto_site? 'checked="checked"' : '')+'></td>'+
            '<td id="auto_showname_id_'+i+'">'+data.showname+'</td>'+
        '</tr>';
    $("#showCustomizeAddress").append(tr);
}

/**
 * 保存默认网址的配置
 */
$("#save").click(function(){
    chrome.storage.local.get('rule_options',function(result){
        var options = result.rule_options;
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

        $("#showCustomizeAddress input:checkbox").each(function (i, item) {
            var id = $(this).attr('id');
            var index = id.substr(id.lastIndexOf("_")+1);
            var flag = $(item).is(':checked');
            for(var j=0; j<options.webset.length; j++) {
                var webset = options.webset[j];
                if(webset.id == index) {
                    webset.auto_site = flag;
                    options.webset[j] = webset;
                }
            }
        });
        saveDateToChrome(options, "save");
    });
});

/**
 * 退出网址设置页面
 */
$("#cancel").click(function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if(tabs.length){
            chrome.tabs.remove(tabs[0].id, function(){})
        }
    });

});

/**
 * 加载初始页面网址
 * @param rule_options
 */
function loadOptions(options){
    //固定表单
    $("#username-test").val(options.login_setting.uat.username);
    $("#password-test").val(options.login_setting.uat.password);
    $("#isAutoCode-test").attr("checked",options.login_setting.uat.isAutoCode);
    $("#isAutoLogin-test").attr("checked",options.login_setting.uat.isAutoLogin);

    $("#username-engine").val(options.login_setting.engine.username);
    $("#password-engine").val(options.login_setting.engine.password);
    $("#isAutoCode-engine").attr("checked",options.login_setting.engine.isAutoCode);
    $("#isAutoLogin-engine").attr("checked",options.login_setting.engine.isAutoLogin);

    $("#uat-new-ch").attr("checked",options.website.uat_site);
    $("#engine-new-ch").attr("checked",options.website.engine_site);
    $("#uat-rts-ch").attr("checked",options.website.uat_rts);
    $("#engine-rts-ch").attr("checked",options.website.engine_rts);

    $("#version").html(options.version);

    //加载自定义网址表单
    showCustomizeAddressAll(options);
    showSetAddressAll(options);
    $.each(options.customizeAddress, function (i, item) {
        $("#delete_auto_id_"+item.id).on('click',delete_address);
        $("#save_auto_id_"+item.id).on('click',save_address);
    });

    //设置监听
    $("#addAddress").on("click", addAddress);
    $("#saveData").on("click", saveData);
    $("#hideFieldSet").on("click", hideFieldSet);
    $("#addFieldSet").hide();
}

/**
 * 显示添加新网址界面
 */
function addAddress() {
    $("#addAddress").hide();
    $("#addFieldSet").show();
}

/**
 * 保存添加的新网址
 */
function saveData() {
    chrome.storage.local.get('rule_options',function(result) {
        var options = result.rule_options;
        var add_showName = $("#add_showName").val();
        var add_address = $("#add_address").val();
        var time = new Date().getTime();
        var address = {
            "id":time,
            "address":add_address,
            "showname":add_showName
        };
        var webset = {
            "id":time,
            "auto_site" : false
        };
        options.customizeAddress.push(address);
        options.webset.push(webset);
        saveDateToChrome(options);
        showCustomizeAddress(time, address, webset);
        showSetAddress(time, address);
        reset();
        $("#delete_auto_id_"+time).on('click',delete_address);
        $("#save_auto_id_"+time).on('click',save_address);
    });
}

/**
 * 修改网址之后保存修改内容
 */
function save_address() {
    var _this = $(this);
    chrome.storage.local.get('rule_options',function(result) {
        var options = result.rule_options;
        var id = _this.attr('id');
        var index = id.substr(id.lastIndexOf("_")+1);
        for(var i=0;  i < options.customizeAddress.length; i++) {
            var customizeAddress = options.customizeAddress[i];
            if(customizeAddress.id == index) {
                options.customizeAddress[i].address = $("#showname_auto_id_"+index).val();
                options.customizeAddress[i].showname = $("#address_auto_id_"+index).val();
            }
        }
        saveDateToChrome(options);
        $("#auto_showname_id_"+index).html($("#showname_auto_id_"+index).val());
    });

}

/**
 * 删除网址
 */
function delete_address(){
    var _this = $(this);
    chrome.storage.local.get('rule_options',function(result){
        var options = result.rule_options;
        var id = _this.attr('id');
        var index = id.substr(id.lastIndexOf("_")+1);
        for(var i=0; i < options.customizeAddress.length; i++) {
            var customizeAddress = options.customizeAddress[i];
            if(customizeAddress.id == index) {
                options.customizeAddress.splice(i,1);
                options.webset.splice(i,1);
            }
        }
        saveDateToChrome(options);
        $($(_this).parent().parent().parent().parent().parent()).remove();

        $("#auto_customize_id_"+index).parent().parent().remove();
    });
}


/**
 * 隐藏添加数据界面
 */
function hideFieldSet() {
    $("#addAddress").show();
    $("#addFieldSet").hide();
    reset();
}

/**
 * 重置网址添加数据
 */
function reset() {
    $("#add_showName").val("");
    $("#add_address").val("");
}

/**
 * 保存数据到Chrome
 * @param date
 */
function saveDateToChrome(date, flag) {
    chrome.storage.local.set({rule_options: date}, function () {
        if(flag){
            chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'img/success.png',
                title: '提示',
                message: '保存成功'
            });
        }
    });
}
