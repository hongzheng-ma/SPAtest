/**
 * Created by huting 18/8/27.
 */
require.config({
    paths: {
        "angular": '../libs/angular/angular.min.v1.2',
         //实现angular单页面路由
        "uiRouter": '../libs/angular/angular-ui-router.min',
        //动态加载js
        "angularAMD": '../libs/angular/angularAMD.min',
        //动态加载js
        "ngload": '../libs/angular/ngload.min',
        //动态加载css
        "angularCSS": "../libs/angular/angular-css.min",
        "jquery": '../libs/jquery/jquery-1.12.4.min',
        //echart插件引用
        "echart":'../libs/plugin/echarts.min',
        "commonFunc":"../js/common/commonFunc",
        //angular路径文件引用
        "routeManager":'routeManager',
        "icheck": "../js/icheck/icheck",
        "public": "../js/public",
        "layer": "../js/layer",
        "select2":"../js/select2",
        "paging":"../js/paging",
        "jqueryUi":"../bower_components/jquery-ui/jquery-ui.min",
        "laydate":"../js/laydate",
        "Transfer":"../js/Transfer",
        "bootstrapValidator":"../js/bootstrapValidator",
        "date_input":"../js/jquery.date_input.pack",
    },
    shim: {
    	//定义require加载的优先顺序
        "angular": { exports: "angular" },
        "uiRouter": ["angular"],
        "angularAMD": ["angular"],
        "ngload": ["angularAMD"],
        "angularCSS": ["angular"],
        'commonFunc':['jquery'],
        'routeManager':["angularAMD","uiRouter"],
        'layer': {
			deps: ['jquery']
		},
		'icheck': {
			deps: ['jquery']
		},
		'paging': {
			deps: ['jquery']
		},
		'public': {
			deps: ['jquery']
		}
    }
});
 //app.js是定义初始化angular项目的配置
define(["angular", "angularAMD", "uiRouter", "angularCSS","app","jquery"
 ], function (angular,angularAMD,uiRouter,angularCSS,myApp) {
	 //资源加载后手动启动项目angular的app
    return angularAMD.bootstrap(myApp);
});


