var myApp = angular.module('myApp', 
  ['ngRoute', 'firebase'])
.constant('FIREBASE_URL', 'https://flashapp.firebaseio.com/');

//var appControllers = angular.module('appControllers', ['firebase']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: 'views/login.html',
    controller:  'RegistrationController'
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller:  'RegistrationController'
  })
  .when('/welcome', {
    templateUrl: 'views/welcome.html'
  })
  .when('/user', {
    templateUrl: 'views/user.html',
    controller:  'UserController'
  })
  .when('/stack/:sId', {
    templateUrl:  'views/stack.html',
    controller:   'StackController'
  })
  .when('/review/:sId', {
    templateUrl:  'views/review.html',
    controller:   'ReviewController'
  })
  .when('/stack/:sId/add', {
      templateUrl: 'views/add-card.html',
      controller:  'CardController'
  })
  .when('/stack/:sId/edit/:cId', {
      templateUrl: 'views/edit-card.html',
      controller:  'CardController'
  })
  .otherwise({
      redirectTo: '/welcome'
  });
}]);