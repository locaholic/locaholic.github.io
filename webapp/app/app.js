'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'uiGmapgoogle-maps'
])
.run(['$rootScope','$state',function($rootScope,$state) {
 
     Parse.initialize("7YyZO6oZNVongKR6pluyULEkMEmvLVRtVZvd6OXn", "JTOrsTnWqTBhxqxFMEvPdOUzDd9Ro01JqpiAF003");

     window.onhashchange=function(){ mouseflow.newPageView(document.location.pathname + document.location.hash); };  var _mfq = _mfq || [];
  (function() {
    var mf = document.createElement("script");
    mf.type = "text/javascript"; mf.async = true;
    mf.src = "//cdn.mouseflow.com/projects/43558e67-da68-4e1f-81f0-23ecdaf10173.js";
    document.getElementsByTagName("head")[0].appendChild(mf);
  })();
    Parse.FacebookUtils.init({
      appId: '971388552927772',
      channelUrl : 'channel.html',
      cookie: true,
      version: 'v2.5',
      xfbml: true
    });
  
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.authenticate){
      console.log("check sessionuser");
      console.log($rootScope.sessionUser);
      if(!$rootScope.sessionUser)
      {
        $rootScope.sessionUser = Parse.User.current();
        console.log("current user fetched");
        console.log($rootScope.sessionUser);
      }
      if($rootScope.sessionUser== null || !$rootScope.sessionUser.authenticated())
      {
      $rootScope.previous=fromState;
      $rootScope.previousParams=fromParams;
      console.log("previous state",$rootScope.previous);
      $state.transitionTo("home.login");
      event.preventDefault(); 
      }
    }
  });

  }])
.config(['$urlRouterProvider','$stateProvider','uiGmapGoogleMapApiProvider' ,function($urlRouterProvider,$stateProvider,uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
         key: 'AIzaSyA83dOY_bZ5DmaWcfX1PDFnYaAWFrO0t3s',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'places',
        sensor:true
        });
  $urlRouterProvider.otherwise('/');

  $stateProvider
  		.state('home',{
  			url: '/',
  			views:{
  				'': {templateUrl: 'main/main.html',
               controller: 'mapCtrl'
  					},
  				'sidebar@home':{templateUrl: 'sidebar/sidebar.html'},
  				'body@home':{templateUrl: 'body/body.html'},
          'list@home':{templateUrl: 'list/list.html'}
  
  			},
        authenticate:true		
  		})
      .state('home.login',{
        url: 'login',
        views:{
          '':{templateUrl: 'login/login.html',
              controller: 'loginCtrl'
              }
        },
      })
      .state('home.detail',{
        url: 'places/:id',
        views:{
          'detail':{templateUrl: 'detail/detail.html',
                    // controller: 'placeDetailCtrl'
                  }
        }
      })
}
]);
