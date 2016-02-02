'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'uiGmapgoogle-maps'
]).
config(['$urlRouterProvider','$stateProvider','uiGmapGoogleMapApiProvider' ,function($urlRouterProvider,$stateProvider,uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
         key: 'AIzaSyA83dOY_bZ5DmaWcfX1PDFnYaAWFrO0t3s',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'places'
        });
  $urlRouterProvider.otherwise('/');

  $stateProvider
  		.state('home',{
  			url: '/',
  			views:{
  				'': {templateUrl: 'main/main.html',
  					},
  				'sidebar@home':{templateUrl: 'sidebar/sidebar.html'},
  				'body@home':{templateUrl: 'body/body.html',
  							 },
  			}		
  		})
  		.state('home.list',{
  			url: 'list',
  			views:{
  				'list':{templateUrl: 'list/list.html'},
  			}
  		})
  		.state('home.list.detail',{
  			url: 'detail',
  			views:{
  				'list':{templateUrl: 'list/list.html'},
  			}
  		})
      .state('home.login',{
        url: 'login',
        views:{
          '':{templateUrl: 'login/login.html'}
        }
      })
}
]);
