
//*********************全局变量定义区域********************
var urlPath;//

//*********************全局变量定义区域********************

if(window.location.href.indexOf("?")>0){
	urlPath = window.location.href.split('?')[1].split('#')[0];
	//console.log("urlPath"+urlPath);
}

//*********************这里放公共的function*****************

//打开蒙版
function openMask() {
	var mask = '<div class="layerMask" style="position:fixed;_position:absolute;top:0;left:0;width:100%;height:100%;text-algin:center;z-index:999999999;background:#fff;opacity:0.8;filter: alpha(opacity=80);"><img src="dist/img/01.gif" style="position:absolute;top:50%;left:50%;margin:-30px 0 0 -30px;"></div>';
	if($("body").find(".layerMask").length > 0) {
		$(".layerMask").show();
	} else {
		$("body").append(mask);
	}
}

//关闭蒙版
function closeMask() {
	if($("body").find(".layerMask").length > 0) {
		$(".layerMask").hide();
	}
}


/*
 *
 * 显示错误提示框
 * 
 */
function tip(tipMsg,time){
    tipMsg = tipMsg|| '请求异常，请联系客服!' //默认提示信息
    time = time || 6000 //默认提示时间
    var addTip = document.createElement('article')
    addTip.className = 'tip-msg'
    var addText = document.createElement('p')
    addText.innerHTML = tipMsg
    addTip.appendChild(addText)
    var body = document.getElementsByTagName('body')[0]
    body.appendChild(addTip);
    setTimeout(function(){ //移除提示
        var removeTip = document.getElementsByClassName('tip-msg')[0]
        body.removeChild(removeTip)
    },time)
}
 /*
  *requestPath：请求路径
  *requestData：请求参数，默认为空
  *requestType：请求方式("POST" 或 "GET")， 默认为 "GET"
  *succCallback：请求成功回调函数
  *errorCallback：请求失败回调函数
  *dataType：预期服务器返回的数据类型， 默认为 JSON 
  */
 
 //ajax请求有蒙版
function baseAjax(requestPath, requestData,requestType,succCallback, errorCallback, dataType){
    requestData = JSON.stringify(requestData) || "{}"
    requestType = requestType || 'GET'
    dataType = dataType || 'JSON'
    $.ajax({
        url: requestPath,               //请求地址
        type:requestType||"json",       //请求类型
        data:requestData,               //请求数据
        timeout:60000,   //请求超时时间(毫秒)
        contentType:"application/json",
        beforeSend:function(){
            openMask()   //发送请求之前，插入加载蒙版”
        },
        success:function(res,a,b,c){ //请求成功
        	succCallback(res);
        },
        complete:function(res,status){
            closeMask(); //请求完成 移除蒙版
        },
        error:function(res,a,b,c){
        	if(a=='timeout'){
        		 tip("请求超时，请稍后再试");
        	}else if(res.responseJSON.msgCode=='401'){
        		//window.location.href = res.responseJSON.message;
        	}
        	else {
        		 tip(res.responseJSON.message);//请求错误，弹出提示
        	}
        }
        //console.log("tt"+(urlPath + requestPath));
    })
}


//ajax请求无蒙版
function baseAjaxT(requestPath, requestData,requestType,succCallback, errorCallback, dataType){
    requestData = JSON.stringify(requestData) || "{}"
    requestType = requestType || 'GET'
    dataType = dataType || 'JSON'
    $.ajax({
        url: requestPath,               //请求地址
        type:requestType||"json",              //请求类型
        data:requestData,              //请求数据
        timeout:30000,//请求超时时间(毫秒)
        contentType:"application/json",
        success:function(res,a,b,c){ //请求成功
        	succCallback(res);
        },
        error:function(res,a,b,c){
        	/*if(a=='timeout'){
        		 tip("请求超时，请稍后再试");
        	}else if(res.responseJSON.msgCode=='401'){
        		window.location.href = res.responseJSON.message;
        	}
        	else {
        		 tip(res.responseJSON.message);//请求错误，弹出提示
        	}*/
        }
    })
}

function jPost(path,data,succCallback,errorCallback){
	baseAjax(path,data,'GET',succCallback,errorCallback)   //post-有参数
}

function jPostT(path,data,succCallback,errorCallback){
	baseAjaxT(path,data,'POST',succCallback,errorCallback)   //无蒙版
}
function jGet(path,data,succCallback,errorCallback){
    baseAjax(path,data,'GET',succCallback,errorCallback)    //get-有参数
}


//切换路由时对应菜单添加样式
function changeMenu(urlpath){
	var zTree_Menu = $.fn.zTree.getZTreeObj("treeDemo");
	urlpath = urlpath.split(".")[1];
	var nowpage = zTree_Menu.getNodeByParam("urlpath",urlpath,null);
	zTree_Menu.selectNode(nowpage );					
}






