define(["layer","paging","select2","laydate"],function(layer,paging,select2,laydate){
	function homeCtrl($rootScope,$scope,$http,$stateParams) {
    	
   
   
    //********************function方法定义区域***********************************************	
		
		//获取列表
    	function listDataSource(num){
   			var data = {
   				rulename:$("#rulename").val(),
   				ruleNum:$("#ruleNum").val(),
   				sqdw:$("#sqdw").val(),
   				num:num || 1 //第几页
   			}
    		jPost(
    			'json/listTest.json',
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
    	
    	//获取弹框数据
    	function getDetailDate(){
   			var data = {
   				dataid:dataid
   			}
    		jPost(
    			'json/detaildata.json',
                data,
            	function(res) {
					$scope.$apply(function() {
						$scope.detailList = res.list;
					})
				},
				function(res) {}
            )
   		}
    	//显示分配弹框
		function showDetailView() {
			layer.ready(function() {
				layer.open({
					type: 1,
					title: '分配信息',
					shadeClose: true,
					shade: 0.6,
					area: ['1000px', '550px'],
					content: $('#FENPEIView'), //iframe的url
					btn: ['保存','关闭'],
					yes: function (layero, index) {
						layer.alert("分配成功");
						layer.closeAll("page");
					},
					cancel: function() {
						//$("#dataId").val("")
					}
				});
			});
		}
		
	//********************事件绑定区域*******************************************
		
		//查询
		$("#queryBtn").on("click",function(){
			listDataSource();
		})
		//清空
		$("#clearBtn").on("click",function(){
			$("#rulename").val("");
			$("#ruleNum").val("");
			$("#sqdw").val("");
		})
		
		//报验按钮点击事件
		$scope.BAOYAN= function(){
			var list;
			if($('input:radio[name=radio]:checked').length<1){
				  	layer.ready(function() {
				  		layer.alert("请选择一条数据再进行此项操作");
				  	})	
			  		return false;
			}else{
			  	layer.ready(function() {
			  		layer.alert("提交成功");
			   })	 
			} 
		}
		
		$scope.QUEREN= function(){
			var list;
			if($('input:radio[name=radio]:checked').length<1){
				  	layer.ready(function() {
				  		layer.alert("请选择一条数据再进行此项操作");
				  	})	
			  		return false;
			}else{
			  	layer.ready(function() {
			  		layer.alert("提交成功");
			   })	 
			} 
		}
       
      //人分配按钮点击事件
      $scope.checkUser = function(myevent){
       		var data = {}
    		jPost(
                //"/api/customer/faimilycurrentors",
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
					title: '人员信息',
					shadeClose: true,
					shade: 0.6,
					area: ['600px', '400px'],
					content: $('#checkUsertView'), //iframe的url
					btn: ['确定','关闭'],
					yes: function (layero, index) {
						if($('input:radio[name=user]:checked').length<1){
							  	layer.ready(function() {
							  		layer.alert("请选择一条数据");
							  	})	
						  		return false;
						  }else{
						  	
						  		layer.close(chooseView);
						  		var chooseuser = JSON.parse($('input:radio[name=user]:checked').attr("data")).USERNAME;
						  		
						  		$(myevent.target).parent().prev().text(chooseuser);
						  }
					},
					cancel: function() {
						//$("#dataId").val("")
					}
				});
				

			});
        }
		//详情弹框
		$scope.InfoView = function(list){
			//alert("1");
			//$scope.editorInfo = JSON.parse(list);
			var list  = list;
			$scope.editorInfo = list;
			getDetailDate();
			layer.ready(function() {
				layer.open({
					type: 1,
					title: '详细信息',
					shadeClose: true,
					shade: 0.6,
					area: ['1000px', '550px'],
					content: $('.InfoView'), //iframe的url
					btn: ['关闭'],
					cancel: function() {
						//$("#dataId").val("")
					}
				});
			});
		}
    //********************方法调用区域********************************   
      
      	listDataSource(); 	
      
      	
				
	}     
   
				
    return homeCtrl;
});

