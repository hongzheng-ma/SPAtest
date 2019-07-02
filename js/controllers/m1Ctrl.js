define(["layer","paging","select2","laydate"],function(layer,paging,select2,laydate){
	function homeCtrl($rootScope,$scope,$http,$stateParams) {
    	
   
   //********************下拉框数据加载区域***********************************************	
   
   			//节点类型下拉框
	   		function getsttType(){
	   			var data = {}
	    		jPost(
	                //"/api/customer/faimilycurrentors",
	                "json/tcType.json",
	                data,
	            	function(res){
	            		var editorList = res;
	            		$(".sttType").select2({
	            			data:editorList
	            		})
	                },
	                function(res){}
	            )
	   		}
	   		
	   		//责任部门下拉框
	   		function getsttzrBm(){
	   			var data = {}
	    		jPost(
	                //"/api/customer/faimilycurrentors",
	                "json/userSpace.json",
	                data,
	            	function(res){
	            		var dataJSon2 = res;
	            		var editorList = $.map(dataJSon2,function(obj){
	            			obj.id = obj.id || obj.USERID;
	            			obj.text = obj.text || obj.USERNAME;
	            			return obj;
	            		})
	            		
	            		$(".sttzrBm").select2({
	            			data:editorList
	            		})
	                },
	                function(res){}
	            )
	   		}
	   		//任务类别下拉框
	   		function getsttRwL(){
	   			var data = {}
	    		jPost(
	                "json/ruleType.json",
	                data,
	            	function(res){
	            		var editorList = res;
	            		$(".sttRwL").select2({
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
	    		elem:'#nowTime',
	    		type:"datetime",
	    		value:new Date()   
	    	})
	    	laydate.render({
	    		elem:'#wcTime_editor'
	    	})
	    	laydate.render({
	    		elem:'#nowTime_editor'
	    	})
    //********************function方法定义区域***********************************************	
		
		//获取列表
    	function listDataSource(num){
   			var data = {
   				rulename:$("#rulename").val(),
   				ruleNum:$("#ruleNum").val(),
   				sqdw:$("#sqdw").val(),
   				num:num || 1 
   			}
    		jPost(
    			'json/listTest.json',
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
					btn: ['关闭'],
					cancel: function() {
						//$("#dataId").val("")
					}
				});
			});
		}
		
		
		//显示编辑弹框
		function showEditorView() {
			layer.ready(function() {
				layer.open({
					type: 1,
					title: '修改信息',
					shadeClose: true,
					shade: 0.6,
					area: ['1000px', '550px'],
					content: $('#editerView'), //iframe的url
					btn: ['保存','关闭'],
					yes: function (layero, index) {
						var data = {//上送数据
			   				dataid:dataid
			   			}
			    		jPost(
			    			'json/detaildata.json',
			                data,
			            	function(res) {
								layer.closeAll("page");
						        layer.alert('保存成功', {icon: 1});
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
		//添加弹框
		function showAddView() {
			layer.ready(function() {
				var addlayer = layer.open({
					type: 1,
					title: '新增任务单',
					shadeClose: true,
					shade: 0.6,
					area: ['1000px', '560px'],
					content: $('#addView'), //iframe的url
					btn: ['保存','关闭'],
					yes: function (layero, index) {
							if($("#bhNm").val()==""){
								layer.alert("请填写编号",{title: "提示"});
								return false;
							}
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
						            
						            clearInput();
						            
						            
								},
								function(res) {}
				            )
			    		
			         },
					cancel: function() {
						 clearInput();
					}
				});
			});
		}
	
		function clearInput(){
			//清空输入框
            $("#ptPro").val("");
            $("#ruleName").val("");
            $("#tcNm").val("");
            $("#ptZc").val("");
            $("#ruleNo").val("");
            $("#isJJ").val("");
            $("#UseTel").val("");
            $("#sqDw").val("");
		}
	
		//弹框中的添加按钮点击 录入弹框
		var addDetailList = [];
		function showDetailAddView(flag) {
			layer.ready(function() {
				var detailAddlayer = layer.open({
					type: 1,
					title: '任务单明细',
					shadeClose: true,
					shade: 0.6,
					area: ['700px', '550px'],
					content: $('#addDetailListView'), //iframe的url
					btn: ['确认','关闭'],
					yes: function (layero, index) {
						
							if($("#cjNr").val()==""){
								layer.alert("请填写承接内容",{title: "提示"});
								return false;
							}
							if($("#wcTime").val()==""){
								layer.alert("请填写完成时间",{title: "提示"});
								return false;
							}
							if($("#jdType").val()==""){
								layer.alert("请填写节点类型",{title: "提示"});
								return false;
							}
							if($("#scZh").val()==""){
								layer.alert("请填写生产制号",{title: "提示"});
								return false;
							}
							if($("#zrBm").val()==""){
								layer.alert("请填写责任部门",{title: "提示"});
								return false;
							}
						
						
							if(flag){  //如果是修改弹框中的 添加
								
								var data = {//上送数据
					   				dataid:dataid
					   			}
					    		jPost(
					    			'json/detaildata.json',
					                data,
					            	function(res) {
								        layer.alert('添加成功', {icon: 1});
									},
									function(res) {}
					            )
								
								
							}else{     //如果是添加弹框中的 添加
								var addObj = {
					            	cjNr:$("#cjNr").val(),
					            	jtYq: $("#jtYq").val(),
					            	wcTime:$("#wcTime").val(),
					            	jdType:$(".sttType option:selected").text(),
					            	scZh:$("#scZh").val(),
					            	zrBm:$(".sttzrBm option:selected").text(),
					            }
					            
					            addDetailList.push(addObj);
					            $scope.$apply(function() {
									 $scope.addDetailList = addDetailList;
								})
							}
							
							
							layer.close(detailAddlayer);
							//清空输入框
				            $("#cjNr").val("");             
				            $("#jtYq").val("");
				            $("#wcTime").val("");
				            $("#jdType").val("");
				            $("#scZh").val("");
				            $("#zrBm").val("");
			    		
			         },
					cancel: function() {}
				});
				
				$("#addDetailListView").parents(".layui-layer-page").find(".layui-layer-btn1").css({"background":"blue"})
			});
		}
		
		
		//弹框中 修改按钮点击事件
		$scope.DETALEDT = function(flag){
			if(flag){  //如果是修改弹框当中的修改按钮
				if($('input:radio[name=EDTRadio]:checked').length<1){
				  	layer.ready(function() {
				  		layer.alert("请选择一条数据再进行此项操作");
					})	
				  		return false;
				}else{
				  	list = $('input:radio[name=EDTRadio]:checked').attr("data");
				}
			}else{ //如果是添加弹框当中的修改按钮
				
				if($('input:radio[name=NRadio]:checked').length<1){
				  	layer.ready(function() {
				  		layer.alert("请选择一条数据再进行此项操作");
					})	
				  		return false;
				}else{
				  	list = $('input:radio[name=NRadio]:checked').attr("data");
				}
			}
			
			$scope.DETAL_EDT = JSON.parse(list);
			layer.ready(function() {
				var editorlayer = layer.open({
					type: 1,
					title: '修改信息',
					shadeClose: true,
					shade: 0.6,
					area: ['900px', '500px'],
					content: $('#DETAL_EDT'), //iframe的url
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
		
		//弹框中 删除按钮点击事件
		$scope.DETALDEL = function(flag){
			if(flag){  //如果是修改弹框当中的删除按钮
				
				if($('input:radio[name=EDTRadio]:checked').length<1){
				  	layer.ready(function() {
				  		layer.alert("请选择一条数据再进行此项操作");
					})	
				  		return false;
				}else{
				  	list = $('input:radio[name=EDTRadio]:checked').attr("data");
				  	
				  	layer.ready(function() {
            			layer.alert('删除成功', {icon: 1});
            		});
				}
				
				
			}else{ //如果是添加弹框当中的删除按钮
				
				if($('input:radio[name=NRadio]:checked').length<1){
				  	layer.ready(function() {
				  		layer.alert("请选择一条数据再进行此项操作");
					})	
				  		return false;
				}else{
				  	list = $('input:radio[name=NRadio]:checked').attr("data");
				  	
				  	layer.ready(function() {
            			layer.alert('删除成功', {icon: 1});
            		});
				}
			}
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
		
		//下达
		$scope.XIADA = function(){
			if($('input:radio[name=radio]:checked').length<1){
				  	layer.ready(function() {
				  		layer.alert("请选择一条数据再进行此项操作");
				  	})	
			  		return false;
			  }else if( JSON.parse($('input:radio[name=radio]:checked').attr("data")).XIADAStt == "01"){
			  	
			  		layer.ready(function() {
				  		layer.alert("已下达状态无法再进行此项操作");
				  	})
			  		
			  }else{
			  	
			  		layer.ready(function() {
				  		layer.alert("下达成功");
				  	})
			  }
		}
		
		
       //添加按钮点击事件
		$("#addBtn").click(function(){
			addDetailList = []; //清空之前的详情表格数据
			$scope.$apply(function() {
				 $scope.addDetailList = addDetailList;
			})
			showAddView();
		})
		
		
		//详情弹框添加按钮点击事件
		$("#AddDetailListBtn").click(function(){
			/*if($("#bhNm").val()=="" || $(".sttRwL").val()==""||$("#ptPro").val()==""||
				$("#ruleName").val()=="" ||$("#tcNm").val()=="" || $("#ruleNo").val()==""||
				$("#isJJ").val()=="" ||$("#sqDw").val=="" || $("#User").val()==""){
				layer.alert("请先输入所有必输项",{title: "提示"});
				return false;
			}*/
			
			$scope.detailId = $("#bhNm").val();
			showDetailAddView();
		})
		
		//修改弹框-------添加按钮点击事件
		$scope.DETALADD= function(flag){
			showDetailAddView(flag);
		}
		//编辑按钮点击事件
		$scope.editorNm= function(){
			var list;
			if($('input:radio[name=radio]:checked').length<1){
				  	layer.ready(function() {
				  		layer.alert("请选择一条数据再进行此项操作");
				  	})	
			  		return false;
			}
			else if( JSON.parse($('input:radio[name=radio]:checked').attr("data")).XIADAStt == "01"){
			  	
		  		layer.ready(function() {
			  		layer.alert("已下达状态无法再进行修改");
			  	})
			  		
			}
			
			else{
			  	list = $('input:radio[name=radio]:checked').attr("data");
			  		 
			  }
			$scope.editorInfo = JSON.parse(list);
			getDetailDate();
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
      	getsttType();
      	getsttzrBm();
      	getsttRwL()
				
	}     
   
				
    return homeCtrl;
});

