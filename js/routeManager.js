/**
 * Created by huting on 18/8/27.
 */

define(["angularAMD"], function (angularAMD) {
    'use strict';
    var routeManager = function($stateProvider, $urlRouterProvider) {
		 //定义默认路径为首页加载home.1
        $urlRouterProvider.otherwise('/home/1');
            $stateProvider.state('home', angularAMD.route({
                    url: '/home',
                    templateUrl: 'views/home.html',
                    css:"css/home.css",
                    controllerUrl: "js/controllers/homeCtrl.js"//登录页面的controller文件
            }))
            .state('home.1', angularAMD.route({
                url: '/1',
                cache:'true',
                templateUrl: 'views/1.html',
                css:"css/m4.css",
                controllerUrl: 'js/controllers/m1Ctrl.js'
            }))
            .state('home.2', angularAMD.route({
                url: '/2?/:ruleId?',
                templateUrl: 'views/2.html',
                css:"css/m4.css",
                controllerUrl: 'js/controllers/m2Ctrl.js'
            }))
            
            .state('home.3', angularAMD.route({
                url: '/3',
                cache:'true',
                templateUrl: 'views/3.html',
                css:"css/m4.css",
                controllerUrl: 'js/controllers/m3Ctrl.js'
            }))
            .state('home.4', angularAMD.route({
                url: '/4',
                cache:'true',
                templateUrl: 'views/4.html',
                css:"css/m4.css",
                controllerUrl: 'js/controllers/m4Ctrl.js'
            }))
            .state('home.5', angularAMD.route({
                url: '/5',
                cache:'true',
                templateUrl: 'views/5.html',
                css:"css/m4.css",
                controllerUrl: 'js/controllers/m5Ctrl.js'
            }))
            
            .state('home.6', angularAMD.route({
                url: '/6',
                cache:'true',
                templateUrl: 'views/6.html',
                css:"css/m4.css",
                controllerUrl: 'js/controllers/m6Ctrl.js'
            }))
            .state('home.7', angularAMD.route({
                url: '/7',
                cache:'true',
                templateUrl: 'views/7.html',
                css:"css/m4.css",
                controllerUrl: 'js/controllers/m7Ctrl.js'
            }))
            .state('home.9', angularAMD.route({
                url: '/9',
                cache:'true',
                templateUrl: 'views/9.html',
                css:"css/m4.css",
                controllerUrl: 'js/controllers/m9Ctrl.js'
            }))
             .state('home.10', angularAMD.route({
                url: '/10',
                cache:'true',
                templateUrl: 'views/10.html',
                css:"css/m4.css",
                controllerUrl: 'js/controllers/m10Ctrl.js'
            }))
            .state('home.11', angularAMD.route({
                url: '/11',
                cache:'true',
                templateUrl: 'views/11.html',
                css:"css/m4.css",
                controllerUrl: 'js/controllers/m11Ctrl.js'
            }))
            .state('home.12', angularAMD.route({
                url: '/12',
                cache:'true',
                templateUrl: 'views/12.html',
                css:"css/m4.css",
                controllerUrl: 'js/controllers/m12Ctrl.js'
            }))
            .state('home.14', angularAMD.route({
                url: '/14',
                cache:'true',
                templateUrl: 'views/14.html',
                css:"css/m4.css",
                controllerUrl: 'js/controllers/m14Ctrl.js'
            }))
            .state('home.15', angularAMD.route({
                url: '/15',
                cache:'true',
                templateUrl: 'views/15.html',
                css:"css/m4.css",
                controllerUrl: 'js/controllers/m15Ctrl.js'
            }))
            .state('home.16', angularAMD.route({
                url: '/16',
                cache:'true',
                templateUrl: 'views/16.html',
                css:"css/m4.css",
                controllerUrl: 'js/controllers/m16Ctrl.js'
            }))
            .state('home.18', angularAMD.route({
                url: '/18',
                cache:'true',
                templateUrl: 'views/18.html',
                css:"css/m4.css",
                controllerUrl: 'js/controllers/m18Ctrl.js'
            }))
            .state('home.19', angularAMD.route({
                url: '/19',
                cache:'true',
                templateUrl: 'views/19.html',
                css:"css/m4.css",
                controllerUrl: 'js/controllers/m19Ctrl.js'
            }))
            .state('home.21', angularAMD.route({
                url: '/21',
                cache:'true',
                templateUrl: 'views/21.html',
                css:"css/m4.css",
                controllerUrl: 'js/controllers/m21Ctrl.js'
            }))
            .state('home.22', angularAMD.route({
                url: '/22',
                cache:'true',
                templateUrl: 'views/22.html',
                css:"css/m4.css",
                controllerUrl: 'js/controllers/m22Ctrl.js'
            }))
            .state('home.23', angularAMD.route({
                url: '/23',
                cache:'true',
                templateUrl: 'views/23.html',
                css:"css/m4.css",
                controllerUrl: 'js/controllers/m23Ctrl.js'
            }))
    }

    return routeManager;
});