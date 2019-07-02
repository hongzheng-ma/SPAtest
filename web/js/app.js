
//routeManager是路径配置文件
define(['angular', 'routeManager'],
    function(angular,RouteManager) {
        var myApp = angular.module('starter', ['ui.router',"door3.css"]);
            myApp.config(
            	//配置按需加载contrlloer
                ['$controllerProvider', function($controllerProvider) {
                    myApp.controller = $controllerProvider.register;
                }])
            //配置路有文件
            .config(RouteManager)
            .run(['$rootScope','$state', '$window',function($rootScope,$state, $window) {
                //$rootScope下可以定义全局方法和全局变量，以下定义了页面跳转的公共方法
                
                $rootScope.go=function(path,param){
                	
                	$state.go(path,param);
                   	changeMenu(path);
                    
                }
            }]);

        window.app = myApp;
        return myApp;
    });