var myApp = angular.module('myApp', 
  ['ngRoute', 'firebase', 'appControllers'])
.constant('FIREBASE_URL', 'https://flashapp.firebaseio.com/');

var appControllers = angular.module('appControllers', ['firebase']);

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
    templateUrl: 'views/welcome.html',
    controller:  'RegistrationController'  
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
  .when('/stack/:sId/card', {
      templateUrl: 'views/card.html',
      controller:  'CardController'
  })
  .when('/stack/:sId/card/:cId', {
      templateUrl: 'views/card.html',
      controller:  'CardController'
  })
  .when('/checkins/:uId/:mId', {
      templateUrl: 'views/checkins.html',
      controller:  'CheckInsController'
  })
  .when('/checkins/:uId/:mId/checkinsList', {
      templateUrl: 'views/checkinslist.html',
      controller:  'CheckInsController'
  })
  .otherwise({
      redirectTo: '/welcome'
  });
}]);