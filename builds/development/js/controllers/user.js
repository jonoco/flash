myApp.controller('UserController', 
	function($scope, $firebase, $firebaseSimpleLogin, $location, FIREBASE_URL) {

	var ref = new Firebase(FIREBASE_URL);
  var simpleLogin = $firebaseSimpleLogin(ref);

  simpleLogin.$getCurrentUser().then(function(authUser) {

    if (authUser !== null) {
			var ref = new Firebase(FIREBASE_URL + '/users/' + authUser.uid + '/stacks');
			var stackInfo = $firebase(ref);
      var stackObj = $firebase(ref).$asObject();

      stackObj.$loaded().then(function(data) {
        $scope.stacks = stackObj;
      }); // user stacks loaded

      $scope.deleteStack = function(id) {
         stackInfo.$remove(id);
      }

			$scope.addStack = function() {
        stackInfo.$push({
          name: $scope.stackName,
          date: Firebase.ServerValue.TIMESTAMP
        }).then(function() {
          $scope.stackName = '';
        });
      } // addstack
		} else {
      $location.path('/welcome')
    } // redirect guests

	}); // get current user
});