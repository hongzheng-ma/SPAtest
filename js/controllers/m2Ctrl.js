define(["layer","paging","select2","laydate"],function(layer,paging,select2,laydate){
	function homeCtrl($rootScope,$scope,$http,$stateParams) {
    	
    	
    	//********************下拉框数据加载区域***********************************************	
    		
    		//投产分类下拉框个数据获取
	   		function getsttcType(){
	   			var data = {}
	    		jPost(
	                "json/tcType.json",
	                data,
	            	function(res){
	            		var editorList = res;
	            		
	            		$(".sttcType").select2({
	            			data:editorList
	            		})
	            		
	            		$(".sttcType_editor").select2({
	            			data:editorList
	            		})
	                },
	                function(res){}
	            )
	   		}	
	   		//选择人下拉框个数据获取
	   		function editorDate(){
	   			var data = {}
	    		jPost(
	                //"/api/customer/faimilycurrentors",
	                "json/username.json",
	                data,
	            	function(res){
	            		var dataJSon2 = res;
	            		var editorList = $.map(dataJSon2,function(obj){
	            			obj.id = obj.id || obj.USERID;
	            			obj.text = obj.text || obj.USERNAME;
	            			return obj;
	            		})
	            		
	            		$(".sttCL").select2({
	            			data:editorList
	            		})
	                },
	                function(res){}
	            )
	   		}
	   		
	   		//日期控件初始化
   			laydate.render({
	    		elem:'#wcTime'
	    	})
   			laydate.render({
	    		elem:'#wcTime_editor'
	    	})
   			
    //********************function方法定义区域***********************************************	
		
		
		//获取查询数据列表
    	function listDataSource(num){
   			var data = {
   				xNum:$("#xNum").val(),
   				xNum:$("#zNum").val(),
   				xNum:$("#tctype").val(),
   				ruleId: ruleId || $("#ruleId").val(),
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
    	//显示分解弹框
		function showFJView(list) {
			
			layer.ready(function() {
				layer.open({
					type: 1,
					title: '分解信息',
					shadeClose: true,
					shade: 0.6,
					area: ['1100px', '500px'],
					content: $('#ruleFJView'), //iframe的url
					btn: ['保存','关闭'],
					yes: function (layero, index) {
						layer.alert("提交成功")
						layer.closeAll("page")
					},
					cancel: function() {
						//$("#dataId").val("")
					}
				});
			});
		}
		
		//添加弹框
		var addDetailList = [];
		function showAddView() {
			layer.ready(function() {
				var addlayer = layer.open({
					type: 1,
					title: '分解信息录入',
					shadeClose: true,
					shade: 0.6,
					area: ['800px', '550px'],
					content: $('#addView'), //iframe的url
					btn: ['确定','关闭'],
					yes: function (layero, index) {
							layer.close(addlayer);
							var addObj = {
				            	xuhao:$("#xuhao").val(),
				            	lingjian: $("#lingjian").val(),
				            	tuhao:$("#tuhao").val(),
				            	shuliang:$("#shuliang").val(),
				            	cailiao:$("#cailiao").val(),
								zhihao:$("#zhihao").val(),
				            	wcTime:$("#wcTime").val(),
				            	sttcType:$(".sttcType option:selected").text(),
				            	sttcTypeID:$(".sttcType").val()
				            }
				            
				            addDetailList.push(addObj);
				            
				            $scope.$apply(function() {
								 $scope.addDetailList = addDetailList;
							})
				            
				            
							//清空输入框
				            $("#xuhao").val("");             
				            $("#lingjian").val("");
				            $("#tuhao").val("");
				            $("#shuliang").val("");
				            $("#cailiao").val("");
				            $("#wcTime").val("");
			    		
			         },
					cancel: function() {
						//$("#dataId").val("")
					}
				});
			});
		}
		
		//分解编辑弹框
		function showEditorView(){
			layer.ready(function() {
				var editorLayer= layer.open({
					type: 1,
					title: '编辑信息',
					shadeClose: true,
					shade: 0.6,
					area: ['900px', '550px'],
					content: $('#editorView'), //iframe的url
					btn: ['保存','关闭'],
					yes: function (layero, index) {
						layer.close(editorLayer);
						layer.alert("修改成功")
					},
					cancel: function() {
						//$("#dataId").val("")
					}
				});
				

			});
		}
		
		//工序弹框
		var GXList = [];
		function addGXView() {
			layer.ready(function() {
				var gxlayer = layer.open({
					type: 1,
					title: '工序信息',
					shadeClose: true,
					shade: 0.6,
					area: ['600px', '400px'],
					content: $('#addGXView'), //iframe的url
					btn: ['保存','关闭'],
					yes: function (layero, index) {
							layer.close(gxlayer);
							var addObj = {
				            	gongxuhao:$("#gongxuhao").val(),
				            	gongxu: $("#gongxu").val(),
				            	gongshi:$("#gongshi").val(),
				            	danjia:$("#danjia").val()
				            	
				            }
				            
				            GXList.push(addObj);
				            
				            $scope.$apply(function() {
								 $scope.GXList = GXList;
							})
				            
				            
							//清空输入框
				            $("#xuhao").val("");             
				            $("#lingjian").val("");
				            $("#tuhao").val("");
				            $("#shuliang").val("");
				            $("#cailiao").val("");
				            $("#zhihao").val("");
				            $("#wcTime").val("");
			    		
			         },
					cancel: function() {
						//$("#dataId").val("")
					}
				});
			});
		}
    	
    //********************控件初始化*******************************************	
    	//日期选择空间初始化
	    	var end = laydate.render({
	    		elem:'#end',
	    		done:function(value,date,endDate){
	    			start.config.min = {
	    				year:date.year-1,
	    				month:Number(date.month-1),
	    				date:date.date
	    			};
	    			start.config.max = {
	    				year:date.year,
	    				month:Number(date.month-1),
	    				date:date.date
	    			};
	    		}
	    	});
	    	var start = laydate.render({
	    		elem:'#start',
	    		done:function(value,date,endDate){
	    			end.config.min = {
	    				year:date.year,
	    				month:Number(date.month-1),
	    				date:date.date
	    			};
	    			end.config.max = {
	    				year:date.year+1,
	    				month:Number(date.month-1),
	    				date:date.date
	    			}
	    		}
	    	});
			
	
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
			$("#ruleId").val("")
		})
		
		//提交
		$scope.submit = function(){
			if($('input:radio[name=radio]:checked').length<1){
				  	layer.ready(function() {
				  		layer.alert("请选择一条数据再进行此项操作");
				  	})	
			  		return false;
			}
			else if(JSON.parse($('input:radio[name=radio]:checked').attr("data")).TIJIAONM == "01"){
				    layer.ready(function() {
				  		layer.alert("已提交状态不能进行此操作");
				  	})
			}
			
			else{
					layer.ready(function() {
				  		layer.alert("提交成功");
				  	})	
			}
		}
		
		//分解
		$scope.ruleFJ = function(){
			var list;
			if($('input:radio[name=radio]:checked').length<1){
				  	layer.ready(function() {
				  		layer.alert("请选择一条数据再进行此项操作");
				  	})	
			  		return false;
			}else{
					list = $('input:radio[name=radio]:checked').attr("data")
			}
			showFJView(list);
			$scope.zhihaoNum = list.scNum;
      	}
		
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
		
		//添加按钮点击事件
		$("#addBtn").click(function(){
			showAddView();
			
			$("#TOUCHAN").on("change",function(e){
			　　  if($("#TOUCHAN").val()=="00"){
					$("#CHANGSHANG").show()
				}else{
					$("#CHANGSHANG").hide()
				}
			})
		})
		
		//编辑按钮点击事件
		$scope.editorNm= function(){
			var list;
			if($('input:radio[name=radio]:checked').length<1){
				  	layer.ready(function() {
				  		layer.alert("请选择一条数据再进行此项操作");
				  	})	
			  		return false;
			  }else{
			  	list = $('input:radio[name=radio]:checked').attr("data");
			  		 
			  }
			
			$scope.editorlist = JSON.parse(list);
			$("#wcTime_editor").val( JSON.parse(list).wcTime);
			$(".sttcType_editor").val(JSON.parse(list).sttcTypeID).select2();
			showEditorView()
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
			
		};
		//导出
		$scope.DODC = function(){
			layer.ready(function() {
		  		layer.alert("导出成功");
		  	})
		}
		
		//图号点击事件
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
				var GXEditorLayer = layer.open({
					type: 1,
					title: '工序信息',
					shadeClose: true,
					shade: 0.6,
					area: ['600px', '400px'],
					content: $('#GXEDTView'), //iframe的url
					btn: ['保存','关闭'],
					yes: function (layero, index) {
						layer.close(GXEditorLayer);
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
      
      	listDataSource();
      	getsttcType()
				
	}     
   
				
    return homeCtrl;
});

