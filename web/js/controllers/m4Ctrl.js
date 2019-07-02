define(["layer","paging","laydate"],function(layer,paging,laydate){
	function homeCtrl($rootScope,$scope,$http,$stateParams) {
    	
    	
      //********************初始化区域***********************************************	
    		//日期控件初始化
   			laydate.render({
	    		elem:'#desTime'
	    	})
	    	laydate.render({
	    		elem:'#PoopTime'
	    	})
	    	laydate.render({
	    		elem:'#AgreeTime'
	    	})
    	
    		laydate.render({
	    		elem:'#desTime_editor'
	    	})
	    	laydate.render({
	    		elem:'#PoopTime_editor'
	    	})
	    	laydate.render({
	    		elem:'#AgreeTime_editor'
	    	})
    //********************function方法定义区域***********************************************	
		
		//获取数据列表
    	function listDataSource(){
   			var data = {
   				}
    		jPost(
    			'json/detaildata.json',
                data,
            	function(res){
            		$("#divT").paging({
				        pageNo:Number(res.pageNum),
				        totalPage:Number(res.pages),
				        totalSize:Number(res.total),
				        callback: function (num) {
				        	getDate(num);
				        }
				    })
            		$scope.$apply(function() {
						$scope.listData = res.list;
					})
                },
                function(res){}
            )
   		}
    	
    	
    	//获取弹框数据-工序
    	function getgxDate(){
   			var data = {
   				dataid:dataid
   			}
    		jPost(
    			'json/gx.json',
                data,
            	function(res) {
					$scope.$apply(function() {
						$scope.gxList = res;
					})
				},
				function(res) {}
            )
   		}
		//工序添加弹框
		var GXList = [];
		function addGXView() {
			layer.ready(function() {
				var gxlayer = layer.open({
					type: 1,
					title: '工序信息',
					shadeClose: true,
					shade: 0.6,
					area: ['700px', '500px'],
					content: $('#addGXView'), //iframe的url
					btn: ['保存','关闭'],
					yes: function (layero, index) {
							layer.close(gxlayer);
							var addObj = {
				            	gongxuhao:$("#gongxuhao").val(),
				            	gongxu: $("#gongxu").val(),
				            	gongshi:$("#gongxu_content").val(),
				            	danjia:$("#danjia").val()
				            	
				            }
				            
				            GXList.push(addObj);
				            
				            console.log(JSON.stringify(GXList));
				            
				            $scope.$apply(function() {
								 $scope.GXList = GXList;
							})
				            
							//清空输入框
				            $("#gongxuhao").val("");             
				            $("#gongxu").val("");
				            $("#gongxu_content").val("");
				            $("#danjia").val("");
			    		
			         },
					cancel: function() {
						//$("#dataId").val("")
					}
				});
			});
		}
		//列表添加弹框
		function showAddView() {
			layer.ready(function() {
				var addlayer = layer.open({
					type: 1,
					title: '工序录入',
					shadeClose: true,
					shade: 0.6,
					area: ['800px', '550px'],
					content: $('#addView'), //iframe的url
					btn: ['保存','关闭'],
					yes: function (layero, index) {
							
							var data = {
								bhNm:$("#bhNm").val()
				   			}
				    		jPost(
				    			'json/gx.json',
				                data,
				            	function(res) {
									layer.close(addlayer);
						            layer.alert('保存成功', {icon: 1});
						            listDataSource();//保存之后调用查询列表方法，刷新数据
						            
						            //清空输入框
						            $("#bhNm").val("");             
						            $("#ptPro").val("");
						            $("#ruleName").val("");
						            $("#tcNm").val("");
						            $("#ptZc").val("");
						            $("#ruleNo").val("");
						            $("#isJJ").val("");
						            $("#UseTel").val("");
						            $("#sqDw").val("");
						            
						            
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
			$("#ruleId").val("");
		})
		
		
		$scope.DAORU = function(){
			layer.ready(function() {
		  		layer.alert("导入成功");
		  	})
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
		//详情弹框
		$scope.InfoView = function(list){
			var data = {
   				dataid:list.dataid
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
					title: '工序信息',
					shadeClose: true,
					shade: 0.6,
					area: ['800px', '450px'],
					content: $('.GXView'), //iframe的url
					btn: ['关闭'],
					cancel: function() {
						//$("#dataId").val("")
					}
				});
			});
		}
		//列表增加
		$scope.LBTJ = function(){
			showAddView();
		}
		
		//列表删除
		$scope.delectNm = function(){
			 if($('input:radio[name=radio]:checked').length<1){
				  	layer.ready(function() {
				  		layer.alert("请选择一条数据再进行此项操作");
				  	})	
			  		return false;
			  }else{
			  		layer.ready(function() {
            			layer.alert('删除成功', {icon: 1});
            		});	
			}
		}
		//工序管理按钮
		$scope.showGX = function(){
			layer.ready(function() {
				layer.open({
					type: 1,
					title: '工序信息',
					shadeClose: true,
					shade: 0.6,
					area: ['900px', '500px'],
					content: $('#GXView'), //iframe的url
					btn: ['保存','关闭'],
					yes: function (layero, index) {
						layer.alert("保存成功")
					},
					cancel: function() {
						//$("#dataId").val("")
					}
				});
				

			});
      	}
		//工序添加
		$scope.GXTJ = function(){
			addGXView()
		}
		//工序修改
		$scope.GXBJ = function(){
			if($('input:radio[name=gongxu]:checked').length<1){
				  	layer.ready(function() {
				  		layer.alert("请选择一条数据再进行此项操作");
				  	})	
			  		return false;
			  }else{
			  	list = $('input:radio[name=gongxu]:checked').attr("data");
			  }
			  $scope.editorInfo = JSON.parse(list);
			
			  layer.ready(function() {
				var editorlayer = layer.open({
					type: 1,
					title: '工序信息',
					shadeClose: true,
					shade: 0.6,
					area: ['700px', '500px'],
					content: $('#GXEDTView'), //iframe的url
					btn: ['保存','关闭'],
					yes: function (layero, index) {
						layer.close(editorlayer);
						layer.alert("修改成功")
					},
					cancel: function() {
						//$("#dataId").val("")
					}
				});
			});
		}
		//工序删除
		$scope.GXSC = function(){
			 if($('input:radio[name=gongxu]:checked').length<1){
				  	layer.ready(function() {
				  		layer.alert("请选择一条数据再进行此项操作");
				  	})	
			  		return false;
			  }else{
			  		var list = $('input:radio[name=gongxu]:checked').attr("data");
			  		 dataid = list.dataid;
			  		 var data = {
		   				dataid:dataid
		   			}
		    		jPost(
		    			'json/detaildata.json',
		                data,
		            	function(res) {
		            		layer.ready(function() {
		            			layer.alert('删除成功', {icon: 1});
		            		});	
						},	
						function(res) {}
		            )
			}
		}
		
		
    //********************方法调用区域********************************   
      
      	listDataSource()
				
	}     
   
				
    return homeCtrl;
});

