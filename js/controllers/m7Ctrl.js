define(["layer","paging","select2","laydate"],function(layer,paging,select2,laydate){
	function homeCtrl($rootScope,$scope,$http,$stateParams) {
    	
    	
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
	    	//获制号列表信息
	    	function  getFJDate(dataid){
	    		var data = {
	   				dataid:dataid
	   			}
	    		jPost(
	    			'json/listData.json',
	                data,
	            	function(res) {
	            		$("#divT_FJList").paging({
					        pageNo:Number(res.pageNum),
					        totalPage:Number(res.pages),
					        totalSize:Number(res.total),
					        callback: function (num) {
					        	listDataSource(num);
					        }
					    })
	            		
						$scope.$apply(function() {
							$scope.ZHIHAOList = res.list;
						})
					},
					function(res) {}
	            )
	    	}
	    	//获取工序列表信息
	    	function  getGXDate(dataid){
	    		var data = {
	   				dataid:dataid
	   			}
	    		jPost(
	    			'json/gx.json',
	                data,
	            	function(res) {
	            		$("#divT_GXList").paging({
					        pageNo:Number(res.pageNum),
					        totalPage:Number(res.pages),
					        totalSize:Number(res.total),
					        callback: function (num) {
					        	listDataSource(num);
					        }
					    })
	            		
						$scope.$apply(function() {
							$scope.GXList = res.list;
						})
					},
					function(res) {}
	            )
	    	}
	//********************事件绑定区域*******************************************
		//保存
		$("#queryBtn").on("click",function(){
			listDataSource();
		})
		//清空
		$("#clearBtn").on("click",function(){
			$("#rulename").val("");
			$("#ruleNum").val("");
			$("#sqdw").val("");
		})
		//确认
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
		//检验按钮点击事件
		$scope.JIANYAN= function(){
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
       
       
       
       
       
       //制号列表查看
       $scope.ZHIHAO = function(dataid){
			getFJDate(dataid);
			layer.ready(function() {
				layer.open({
					type: 1,
					title: '详细信息',
					shadeClose: true,
					shade: 0.6,
					area: ['800px', '400px'],
					content: $('.ZHIHAOLIST'), //iframe的url
					btn: ['关闭'],
					cancel: function() {
						//$("#dataId").val("")
					}
				});
			});
		}
       
       
       
       //工序列表查看
       $scope.showGX = function(dataid){
			getGXDate(dataid);
			
			layer.ready(function() {
				layer.open({
					type: 1,
					title: '工序列表',
					shadeClose: true,
					shade: 0.6,
					area: ['750px', '450px'],
					content: $('.GXView'), //iframe的url
					btn: ['关闭'],
					cancel: function() {
						//$("#dataId").val("")
					}
				});
			});
		}
       
    //********************方法调用区域********************************   
      
      	listDataSource()
				
	}     
   
				
    return homeCtrl;
});

