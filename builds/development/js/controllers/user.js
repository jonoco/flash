myApp.controller('UserController', 
	function($scope, $rootScope, $firebaseObject, $firebaseArray, $firebaseAuth, $location, FIREBASE_URL) {

  var ref = new Firebase( FIREBASE_URL );
  var authObj = $firebaseAuth( ref );
  var authData = authObj.$getAuth();

  if (authData) {
		var ref = new Firebase(FIREBASE_URL + '/users/' + authData.uid + '/stacks');
		var stackAry = $firebaseArray(ref);
    var stackObj = $firebaseObject(ref);

    stackObj.$loaded().then(function(data) {
      $scope.stacks = stackObj;
    }); // user stacks loaded

    $scope.deleteStack = function(id) {
       var stack = new Firebase(FIREBASE_URL + '/users/' + authData.uid + '/stacks/' + id);
       stack.remove();
    }

		$scope.addStack = function() {
      stackAry.$add({
        name: $scope.stackName,
        date: Firebase.ServerValue.TIMESTAMP
      }).then(function() {
        $scope.stackName = '';
      });
    } // addstack
	} else {
    $location.path('/')
  } // check authentication

});