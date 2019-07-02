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
			
    	
	    	//人员添加弹框
			function addGXView() {
				layer.ready(function() {
					layer.open({
						type: 1,
						title: '新增信息',
						shadeClose: true,
						shade: 0.6,
						area: ['600px', '400px'],
						content: $('#addGXView'), //iframe的url
						btn: ['保存','关闭'],
						yes: function (layero, index) {
								layer.closeAll("page");
								layer.alert("新增成功");
					            
					            listDataSource(); //新增之后调用查询方法
					            
								//清空输入框
					            $("#gongxuhao").val("");             
					            $("#gongxu").val("");
					            $("#gongshi").val("");
					            $("#danjia").val("");
				    		
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
			//人员添加
			$scope.GXTJ = function(){
				addGXView()
			}
		
			
			
			//删除按钮点击事件
			$scope.delectNm = function(){
				 var dataid;
				  if($('input:radio[name=radio]:checked').length<1){
					  	layer.ready(function() {
					  		layer.alert("请选择一条数据再进行此项操作");
					  	})	
				  		return false;
				  }else{
				  		var list = $('input:radio[name=radio]:checked').attr("data");
				  		 dataid = list.dataid
				  }
				layer.ready(function() {
					layer.open({
						type: 1,
						title: '提示',
						shadeClose: true,
						shade: 0.6,
						area: ['250px', '150px'],
						content: $('#delectView'), //iframe的url
						btn: ['确认','取消'],
						yes: function (layero, index) {
							var data = {
					   				dataid:dataid
					   			}
					    		jPost(
					    			'json/detaildata.json',
					                data,
					            	function(res) {
					            		layer.closeAll("page");
					            		layer.alert('删除成功', {icon: 1});
					            		listDataSource();
									},	
									function(res) {}
					            )
						},
						cancel: function() {
							//$("#dataId").val("")
						}
					});
				});
	        }
       
       
       
       		//人员修改
			$scope.editorNm = function(){
				if($('input:radio[name=radio]:checked').length<1){
					  	layer.ready(function() {
					  		layer.alert("请选择一条数据再进行此项操作");
					  	})	
				  		return false;
				  }else{
				  	list = $('input:radio[name=radio]:checked').attr("data");
				  }
				  $scope.editorInfo = JSON.parse(list);
				
				  layer.ready(function() {
					layer.open({
						type: 1,
						title: '人员信息',
						shadeClose: true,
						shade: 0.6,
						area: ['600px', '400px'],
						content: $('#GXEDTView'), //iframe的url
						btn: ['保存','关闭'],
						yes: function (layero, index) {
							layer.closeAll("page");
							layer.alert("修改成功")
						},
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

