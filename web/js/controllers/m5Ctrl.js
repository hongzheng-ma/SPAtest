define(["layer","paging","select2","laydate"],function(layer,paging,select2,laydate){
	function homeCtrl($rootScope,$scope,$http,$stateParams) {
    
    
    //********************控件初始化区域***********************************************	
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
    			'json/listdata.json',
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
		//查询
		$("#queryBtn").on("click",function(){
			listDataSource();
		})
		//清空
		$("#clearBtn").on("click",function(){
			$("#xNum").val("");
			$("#zNum").val("");
			$("#tctype").val("");
			$("#zhihao").val("")
		})
		//详情弹框
		$scope.InfoView = function(list){
			var list  = list;
			$scope.detailInfo = list;
			layer.ready(function() {
				layer.open({
					type: 1,
					title: '详细信息',
					shadeClose: true,
					shade: 0.6,
					area: ['1000px', '400px'],
					content: $('.InfoView'), //iframe的url
					btn: ['关闭'],
					cancel: function() {
						//$("#dataId").val("")
					}
				});
			});
		}
		//整件外协
		$("#ZJWX").on("click",function(){
			var data = {}
    		jPost(
                "json/userInfo.json",
                data,
            	function(res){
            		$scope.$apply(function() {
						 $scope.userList = res;
					})
            		
                },
                function(res){}
            )
			layer.ready(function() {
				var chooseView = layer.open({
						type: 1,
						title: '分配',
						shadeClose: true,
						shade: 0.6,
						area: ['800px', '450px'],
						content: $('#ZJWXView'), //iframe的url
						btn: ['确定','关闭'],
						yes: function (layero, index) {
							/*layer.closeAll("page");
							layer.alert("保存成功")*/
							if($('input:radio[name=user]:checked').length<1){
							  	layer.ready(function() {
							  		layer.alert("请选择一条数据");
								  	})	
							  		return false;
							  }else{
							  	
							  		layer.close(chooseView);
							  		layer.alert("保存成功");
							  		var chooseuser = JSON.parse($('input:radio[name=user]:checked').attr("data")).USERNAME;
							  		
							  		$(myevent.target).parent().prev().text(chooseuser);
							  }
						},
						cancel: function() {
							//$("#dataId").val("")
						}
				});
			});
		})
		
		//提交
		$scope.submitBtn = function(){
			if($('input:checkbox[name=checkbox]:checked').length<1){
				  	layer.ready(function() {
				  		layer.alert("请至少选择一条数据再进行此项操作");
				  	})	
			  		return false;
			 }else{
				layer.ready(function() {
			  		layer.alert("提交成功");
			  	})
			}
		}
		
    //********************方法调用区域********************************   
      
      	listDataSource()
				
	}     
   
				
    return homeCtrl;
});

