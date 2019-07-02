define([],function(){
    function homeCtrl($rootScope,$scope,$http) {
    	
   
    //*****************************function方法区域**********************************
    	
    	//待查阅数目
    	function backlognum(){
	    	var data = {}
    		jPostT(
        	    "/api/home/backlognum",
        	    data,
            	function(res){
	        	    $scope.$apply(function() {
						 $scope.backlognum = res;
					})
                },
                function(res){}
            )
    	}
    	
    	//待查阅内容
    	/*function getpendDate(){
	    	var data = {
	    			pageSize: '100',
					pageNumber:  "1"
               }
    		jPostT(
        	    "/api/home/backlog",
        	    data,
            	function(res){
	        	    $scope.$apply(function() {
						 $scope.backlogList = res.list;
					})
                },
                function(res){}
            )
    	}*/
    	//菜单
    	function getmenuData(){
    		jGet(
         	    'json/menu.json',
            	//'api/home/menu',
            	{},
            	function(res){
            	  $scope.$apply(function() {
						$scope.userInfo = res.userInfo;
						$scope.modifytime = res.modifytime;
						//$scope.zNodes = res.zNodes;
				  })
               	    var  zNodes = res.zNodes;
               	    
               	    
               	    
	                $(document).ready(function(){
							var treeObj = $("#treeDemo");
							$.fn.zTree.init(treeObj, setting, zNodes);
							
							zTree_Menu = $.fn.zTree.getZTreeObj("treeDemo");
							var urlpath=location.hash.split("/")[2];
							urlpath = urlpath.split("?")[0];
							//console.log("url"+urlpath);
							var nowpage = zTree_Menu.getNodeByParam("urlpath",urlpath,null);
							zTree_Menu.selectNode(nowpage );
							
							
							
							if(!nowpage){
								 $rootScope.go('home.'+1);
								 //$(".glyphicon-log-out").click();
							}
							
						
						  //内容超过一屏展示滚动条	
				           var windH = window.innerHeight;
				           var topH = $(".main-header").height();
				           $(".content-wrapper").css("height",windH-topH+"px");
				           $(".content-wrapper").css("overflow-y","auto");
				           $(".content-wrapper").css("overflow-x","hidden");
				           
				           $(".main-sidebar").css("height",windH-topH+"px");
				           $(".main-sidebar").css("overflow-y","auto");
					});
                },
                function(res){}
            )
    	}
    	
    	//Ztree setting方法
    	function addDiyDom(treeId, treeNode) {
			var spaceWidth = 5;
			var switchObj = $("#" + treeNode.tId + "_switch"),
			icoObj = $("#" + treeNode.tId + "_ico");
			switchObj.remove();
			icoObj.before(switchObj);

			if (treeNode.level > 1) {
				var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level)+ "px'></span>";
				switchObj.before(spaceStr);
			}
		}
    //*****************************引用插件配置区域************************************	
		
		var curMenu = null,
		zTree_Menu = null;
		var setting = {
			view: {
				showLine: false,
				showIcon: false,
				selectedMulti: false,
				dblClickExpand: false,
				addDiyDom: addDiyDom
			},
			data: {
				simpleData: {
					enable: true,
					pIdKey:'pid'
				}
			},
			callback: {
				onClick: onClick
			}
		};
		
		//菜单栏点击事件
		function onClick(event,treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.expandNode(treeNode);
			//console.log(JSON.stringify(treeNode.id));
			
			//点击切换路由,局部刷新页面
           if(treeNode.urlpath){
           		 $rootScope.go('home.'+treeNode.urlpath);
           }
		}
		
		
	//***********************************事件绑定区域*************************************			
		
		
		//退出登录
		$scope.logout = function(){
			jPost(
                //"/api/authuser/logout",
				{},
            	function(res){
            		window.top.location.href=res.url;
            	},
                function(res){}
            )
		}
		
		
	//************************************方法调用区域*************************************	
		
		getmenuData();
    }


    return homeCtrl;
});