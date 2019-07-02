define(["layer","paging","select2","laydate"],function(layer,paging,select2,laydate){
	function homeCtrl($rootScope,$scope,$http,$stateParams) {
		
    //********************下拉框数据加载区域***********************************************		
    	
    	   //日期控件初始化
   			laydate.render({
	    		elem:'#WANCHENGTIME'
	    	})
    	
    //********************function方法定义区域***********************************************	
			//获取查询数据列表
	    	function listDataSource(num){
	   			var data = {
	   				num:num || 1
	   			}
	    		jPost(
	    			'json/WAIXIEData.json',
	                //"/api/datasource/listDataSource",
	                data,
	            	function(res){
	            		$("#divT").paging({
					        pageNo:Number(res.pageNum),
					        totalPage:Number(res.pages),
					        totalSize:Number(res.total),
					        callback: function (num) {
					        	listDataSource(num);
					        }
					    })
	            		$scope.$apply(function() {
							$scope.listData = res.list;
						})
	                },
	                function(res){}
	            )
	   		}
			
    	
	//********************事件绑定区域*******************************************
		
		$scope.showXQ = function(){
			var data = {
   			}
    		jPost(
    			'json/gx.json',
                data,
            	function(res) {
					$scope.$apply(function() {
						$scope.GXINfo= res.list;
					})
				},
				function(res) {}
            )
			layer.ready(function() {
				layer.open({
					type: 1,
					title: '明细列表',
					shadeClose: true,
					shade: 0.6,
					area: ['900px', '450px'],
					content: $('.GONGXULIST'), //iframe的url
					btn: ['确定','关闭'],
					cancel: function() {
						//$("#dataId").val("")
					}
				});
			});
		}
			$scope.showTQ = function(){
			var data = {
			}
			// $("layui-layer1").css("z-index":0)
			jPost(
				'json/gx.json',
		        data,
		    	function(res) {
					$scope.$apply(function() {
						$scope.GXINfo= res.list;
					})
				},
				function(res) {}
		    )
			layer.ready(function() {
				layer.open({
					type: 1,
					title: '工艺列表',
					shadeClose: true,
					shade: 0.5,
					area: ['1000px', '500px'],
					content: $('.GONGYILIST'), //iframe的url
					btn: ['确定','关闭'],
					cancel: function() {
						//$("#dataId").val("")
					}
				});
			});
		}
		//供应商选择
		$scope.LR = function(){
			if($('input:checkbox[name=checkbox]:checked').length<1 || $('input:checkbox[name=checkbox]:checked').length>1){
			  	layer.ready(function() {
			  		layer.alert("选择一条数据进行此项操作");
			  	})	
		  		return false;
			}
			var data = {}
    		jPost(
                "json/CHANGSHANG.json",
                data,
            	function(res){
            		$scope.$apply(function() {
						 $scope.userList = res;
					})
            		
                },
                function(res){}
            )
			layer.ready(function() {
			 var chooseLayer = 	layer.open({
					type: 1,
					title: '选择厂商',
					shadeClose: true,
					shade: 0.6,
					area: ['800px', '450px'],
					content: $('#LRView'), //iframe的url
					btn: ['确定','关闭'],
					yes: function (layero, index) {
						/*var gyTd = $('input:checkbox[name=checkbox]:checked').parents("tr").find(".gongying");
						var priceTd = $('input:checkbox[name=checkbox]:checked').parents("tr").find(".jiage");
						gyTd.text($(".provider option:selected").text(),);
						priceTd.text($("#priceTd").val());*/
						
						layer.close(chooseLayer);
						
						$(".provider").val("").select2();// 清空选择框
						$("#priceTd").val("")
					},
					cancel: function() {
						//$("#dataId").val("")
					}
				});
			});
			
			
			
		}
		
		
		//查询
		$("#queryBtn").on("click",function(){
			listDataSource();
		})
		//清空
		$("#clearBtn").on("click",function(){
			$("#xNum").val("");
			$("#zNum").val("");
			$("#tctype").val("");
		})
		
       
    //********************方法调用区域********************************   
      
      	listDataSource();
				
	}     
   
				
    return homeCtrl;
});

