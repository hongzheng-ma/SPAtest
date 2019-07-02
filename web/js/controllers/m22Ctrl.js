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
    			'json/listData.json',
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
    			'json/listData.json',
                data,
            	function(res) {
					$scope.$apply(function() {
						$scope.detailList = res.list;
					})
				},
				function(res) {}
            )
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
		
		//提交按钮点击事件
		$scope.submit = function(){
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
		//入库
		$scope.RUKU = function(){
			if($('input:radio[name=radio]:checked').length<1){
				  	layer.ready(function() {
				  		layer.alert("请选择一条数据再进行此项操作");
				  	})	
			  		return false;
			}else{
				var data = {}
	    		jPost(
	    			'json/listData.json',
	                data,
	            	function(res) {
						$scope.$apply(function() {
							$scope.detailList= res.list;
						})
					},
					function(res) {}
	            )
				layer.ready(function() {
					layer.open({
						type: 1,
						title: '入库详细',
						shadeClose: true,
						shade: 0.6,
						area: ['900px', '450px'],
						content: $('.RUKULIST'), //iframe的url
						btn: ['确定','关闭'],
						cancel: function() {
							//$("#dataId").val("")
						}
					});
				});
			}
			
		}
       
      
    //********************方法调用区域********************************   
      
      	listDataSource(); 	
      
      	
				
	}     
   
				
    return homeCtrl;
});

