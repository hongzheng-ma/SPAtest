define(["layer","paging","select2","laydate"],function(layer,paging,select2,laydate){
	function homeCtrl($rootScope,$scope,$http,$stateParams) {
    	
    	
    //********************function方法定义区域***********************************************	
			//获取查询数据列表
	    	function listDataSource(num){
	   			var data = {
	   				num:num || 1
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
			
    		//获取详情列表数据
	    	function getDetailDate(dataid){
	   			var data = {
	   				dataid:dataid
	   			}
	    		jPost(
	    			'json/detaildata.json',
	                data,
	            	function(res) {
	            		$("#divT_detail").paging({
					        pageNo:Number(res.pageNum),
					        totalPage:Number(res.pages),
					        totalSize:Number(res.total),
					        callback: function (num) {
					        	listDataSource(num);
					        }
					    })
	            		
						$scope.$apply(function() {
							$scope.detailList = res.list;
						})
					},
					function(res) {}
	            )
	   		}
	    	
	    	//获取分解列表信息
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
							$scope.FJList = res.list;
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
	    	
	    	
	    function getWXDate(num){
			var data = {
   				num:num || 1
   			}
    		jPost(
    			'json/zhdata.json',
                //"/api/datasource/listDataSource",
                data,
            	function(res){
            		$("#ZJ_divT").paging({
				        pageNo:Number(res.pageNum),
				        totalPage:Number(res.pages),
				        totalSize:Number(res.total),
				        callback: function (num) {
				        	listDataSource(num);
				        }
				    })
            		$scope.$apply(function() {
						$scope.ztData = res.list;
					})
                },
                function(res){}
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
		
       
       //列表详情查看
       $scope.showXQ = function(dataid){
			getDetailDate(dataid);
			
			layer.ready(function() {
				layer.open({
					type: 1,
					title: '详细信息',
					shadeClose: true,
					shade: 0.6,
					area: ['1100px', '550px'],
					content: $('.detailView'), //iframe的url
					btn: ['关闭'],
					cancel: function() {
						//$("#dataId").val("")
					}
				});
			});
		}
       
       
       
       //分解列表查看
       $scope.ruleFJ = function(dataid){
			getFJDate(dataid);
			
			layer.ready(function() {
				layer.open({
					type: 1,
					title: '详细信息',
					shadeClose: true,
					shade: 0.6,
					area: ['1000px', '400px'],
					content: $('.FJListView'), //iframe的url
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
					title: '工序详细信息',
					shadeClose: true,
					shade: 0.6,
					area: ['800px', '550px'],
					content: $('.GXView'), //iframe的url
					btn: ['关闭'],
					cancel: function() {
						//$("#dataId").val("")
					}
				});
			});
		}
       
       
       //整体件外协
        $scope.showZJView = function(dataid){
			getWXDate(dataid);
			
			layer.ready(function() {
				layer.open({
					type: 1,
					title: '整体件外协',
					shadeClose: true,
					shade: 0.6,
					area: ['900px', '400px'],
					content: $('#ztwx_content'), //iframe的url
					btn: ['关闭'],
					cancel: function() {
						//$("#dataId").val("")
					}
				});
			});
		}
        
        //工序外协
        $scope.showGXView = function(dataid){
			getWXDate(dataid);
			
			layer.ready(function() {
				layer.open({
					type: 1,
					title: '工序外协',
					shadeClose: true,
					shade: 0.6,
					area: ['900px', '400px'],
					content: $('#ztwx_content'), //iframe的url
					btn: ['关闭'],
					cancel: function() {
						//$("#dataId").val("")
					}
				});
			});
		}
        
        //自制弹框
        $scope.showZZView = function(dataid){
			getWXDate(dataid);
			
			layer.ready(function() {
				layer.open({
					type: 1,
					title: '自制',
					shadeClose: true,
					shade: 0.6,
					area: ['900px', '400px'],
					content: $('#ztwx_content'), //iframe的url
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

