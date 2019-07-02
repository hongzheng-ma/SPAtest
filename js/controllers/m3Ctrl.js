define(["layer","paging"],function(layer,paging){
	function homeCtrl($rootScope,$scope,$http,$stateParams) {
    	
    	
    //********************function方法定义区域***********************************************	
		
		//获取数据列表
    	function listDataSource(){
   			var data = {
   				name:$("#name").val(),
   				Num:$("#Num").val(),
   				lj:$("#linjian").val()
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
    	
	//********************事件绑定区域*******************************************
		//查询
		$("#queryBtn").on("click",function(){
			listDataSource();
		})
		//清空
		$("#clearBtn").on("click",function(){
			$("#name").val("");
			$("#Num").val("");
			$("#linjian").val("")
		})
		
    //********************方法调用区域********************************   
      
      	listDataSource()
				
	}     
   
				
    return homeCtrl;
});

