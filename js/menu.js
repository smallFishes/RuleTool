/**
 * Created by hasee on 2018/8/31.
 */
function copyQuerySQL(){
    var SQL,org,product,channel,startTime,endTime,riskClass,teamCarCode;
    var middle_frame = window.frames["middle"];
    if(middle_frame){
        var titles = middle_frame.document.getElementsByClassName("title");
        if(titles.length > 0){
            var rule_title = titles[0].innerText;
            //自核
            if("细则设置" == rule_title){
                org = getOrg(middle_frame);
                product = getProduct(middle_frame);
                channel = getChannel(middle_frame);
                startTime = getStartTime(middle_frame);
                endTime = getEndTime(middle_frame);

                SQL = "SELECT * FROM tbl_r_category_rule_relation where org_code = '"+org+"' and channel_code = '"+channel+"' and product_code = '"+product+"' and is_delete = 0 ";

                if(startTime){
                    SQL += " and start_time = to_date('"+startTime+"','yyyy-mm-dd hh24:mi:ss')";
                }

                if(endTime){
                    SQL += " and end_time = to_date('"+endTime+"','yyyy-mm-dd hh24:mi:ss');";
                }

            }
            //费用跟单
            if("绩效跟单车险规则设置" == rule_title){
                org = getOrg(middle_frame);
                product = getProduct(middle_frame);
                channel = getChannel(middle_frame);
                startTime = getStartTime(middle_frame);
                endTime = getEndTime(middle_frame);

                SQL = "SELECT * FROM car_category_rule_relation where org_code = '"+org+"' and channel_code = '"+channel+"' and product_code = '"+product+"' and id_delete = 0 ";
                if(startTime){
                    SQL += " and start_time = to_date('"+startTime+"','yyyy-mm-dd hh24:mi:ss')";
                }

                if(endTime){
                    SQL += " and end_time = to_date('"+endTime+"','yyyy-mm-dd hh24:mi:ss');";
                }
            }
            //非车险费用跟单
            if("非车险绩效规则设置" == rule_title){
                org = getOrg(middle_frame);
                product = getProduct(middle_frame);
                channel = getChannel(middle_frame);
                riskClass = getRiskClass(middle_frame);
                startTime = getStartTime(middle_frame);
                endTime = getEndTime(middle_frame);

                SQL = "SELECT * FROM nocar_category_rule_relation where org_code = '"+org+"' and channel_code = '"+channel+"' and product_code = '"+product+"' and risk_class = '"+riskClass+"' and id_delete = 0 ";
                if(startTime){
                    SQL += " and start_time = to_date('"+startTime+"','yyyy-mm-dd hh24:mi:ss')";
                }

                if(endTime){
                    SQL += " and end_time = to_date('"+endTime+"','yyyy-mm-dd hh24:mi:ss');";
                }
            }

            //自核团车
            if("自核团车规则设置" == rule_title){
                org = getOrg(middle_frame);
                teamCarCode = getTeamCarCode(middle_frame);
                startTime = getStartTime(middle_frame);
                endTime = getEndTime(middle_frame);

                SQL = "SELECT * FROM tbl_r_category_rule_relation where org_code = '"+org+"' and team_car_cde = '"+teamCarCode+"' and is_delete = 0 ";

                if(startTime){
                    SQL += " and start_time = to_date('"+startTime+"','yyyy-mm-dd hh24:mi:ss')";
                }

                if(endTime){
                    SQL += " and end_time = to_date('"+endTime+"','yyyy-mm-dd hh24:mi:ss');";
                }
            }

            //费用跟单团车
            if("绩效跟单团车规则设置" == rule_title){
                org = getOrg(middle_frame);
                teamCarCode = getTeamCarCode(middle_frame);
                startTime = getStartTime(middle_frame);
                endTime = getEndTime(middle_frame);

                SQL = "SELECT * FROM car_category_rule_relation where org_code = '"+org+"' and team_car_cde = '"+teamCarCode+"' and id_delete = 0 ";

                if(startTime){
                    SQL += " and start_time = to_date('"+startTime+"','yyyy-mm-dd hh24:mi:ss')";
                }

                if(endTime){
                    SQL += " and end_time = to_date('"+endTime+"','yyyy-mm-dd hh24:mi:ss');";
                }
            }
            copyTextToClipboard(SQL,middle_frame);
        }
    }
}

copyQuerySQL();

/**
 * 机构
 * @param frame
 * @returns {*}
 */
function getOrg(frame){
    var orgStr = frame.document.getElementsByClassName("curSelectedNode");
    if(orgStr.length == 0) {
        return "";
    }
    return orgStr[0].outerText.split("--")[0];
}

/**
 * 产品
 * @param frame
 * @returns {*}
 */
function getProduct(frame){
    var product_index = frame.document.getElementById("productList").selectedIndex;
    if(product_index < 0) {
        return "";
    }
    return frame.document.getElementById("productList").options[product_index].value;
}

/**
 * 渠道
 * @param frame
 * @returns {*}
 */
function getChannel(frame){
    var channel_index = frame.document.getElementById("channelList").selectedIndex;
    if(channel_index < 0) {
        return "";
    }
    return frame.document.getElementById("channelList").options[channel_index].value;
}

/**
 * 险类
 * @param frame
 * @returns {*}
 */
function getRiskClass(frame){
    var riskClass_index = frame.document.getElementById("riskClassList").selectedIndex;
    if(riskClass_index < 0) {
        return "";
    }
    return frame.document.getElementById("riskClassList").options[riskClass_index].value;
}

/**
 * 团车编码
 * @param frame
 * @returns {*}
 */
function getTeamCarCode(frame){
    var teamCarCode_index = frame.document.getElementById("teamCarCdeList").selectedIndex;
    if(teamCarCode_index < 0) {
        return "";
    }
    return frame.document.getElementById("teamCarCdeList").options[teamCarCode_index].value;
}

function getStartTime(frame){
    return frame.document.getElementById("startTime").value;
}
function getEndTime(frame){
    return frame.document.getElementById("endTime").value;
}

function copyTextToClipboard(text,frame) {
    var textArea = frame.document.createElement("textarea");

    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = text;

    frame.document.body.appendChild(textArea);

    textArea.select();

    try {
        frame.document.execCommand('copy');
    } catch (err) {
        console.log(err);
        console.log('不能使用这种方法复制内容');
    }
    frame.document.body.removeChild(textArea);
}