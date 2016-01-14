// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var myApp = angular.module('starter', ['ionic','angularMoment']);

myApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});



myApp.controller('starterCtrl',['$http','$scope',function($http,$scope){

  var vm = this;
  vm.stories = [];


        vm.loadstories = function(params,callback){
          $http.get('https://www.reddit.com/r/EverythingScience/new/.json',{params:params})
            .success(function(response){
              var stories = [];
                angular.forEach(response.data.children,function(child){
                    vm.stories.push(child.data);
                });
                callback(stories);
            });
        }

      vm.loadOlderStories = function(){
        var params = {};
        if(vm.stories.length!=0){
          params["after"]= vm.stories[vm.stories.length-1].name
        }
        vm.loadstories(params,function(olderstories){
            vm.stories = vm.stories.concat(olderstories);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });

      };

      vm.loadNewerStories = function(){
          var params = {'before': vm.stories[0].name};
          vm.loadstories(params,function(newerstories){
            vm.stories = newerstories.concat(vm.stories);
            $scope.$broadcast('scroll.refreshComplete');
          });
      };
}]);

// .config(function($stateProvider, $urlRouterProvider) {
//
//   // Ionic uses AngularUI Router which uses the concept of states
//   // Learn more here: https://github.com/angular-ui/ui-router
//   // Set up the various states which the app can be in.
//   // Each state's controller can be found in controllers.js
//   $stateProvider
//
//   // setup an abstract state for the tabs directive
//     .state('tab', {
//     url: '/tab',
//     abstract: true,
//     templateUrl: 'templates/tabs.html'
//   })
//
//   // Each tab has its own nav history stack:
//
//   .state('tab.dash', {
//     url: '/dash',
//     views: {
//       'tab-dash': {
//         templateUrl: 'templates/tab-dash.html',
//         controller: 'DashCtrl'
//       }
//     }
//   })
//
//   .state('tab.chats', {
//       url: '/chats',
//       views: {
//         'tab-chats': {
//           templateUrl: 'templates/tab-chats.html',
//           controller: 'ChatsCtrl'
//         }
//       }
//     })
//     .state('tab.chat-detail', {
//       url: '/chats/:chatId',
//       views: {
//         'tab-chats': {
//           templateUrl: 'templates/chat-detail.html',
//           controller: 'ChatDetailCtrl'
//         }
//       }
//     })
//
//   .state('tab.account', {
//     url: '/account',
//     views: {
//       'tab-account': {
//         templateUrl: 'templates/tab-account.html',
//         controller: 'AccountCtrl'
//       }
//     }
//   });
//
//   // if none of the above states are matched, use this as the fallback
//   $urlRouterProvider.otherwise('/tab/dash');
//
// });
