myApp.controller('StackController', 
	function($scope, $firebaseObject, $firebaseArray, $firebaseAuth, $routeParams, $location, FIREBASE_URL) {
	$scope.stackId = $routeParams.sId;

	var ref = new Firebase( FIREBASE_URL );
  var authObj = $firebaseAuth( ref );
  var authData = authObj.$getAuth();

  if (authData) {
  	var stackRef = new Firebase(FIREBASE_URL + '/users/' + authData.uid + '/stacks/' + $scope.stackId);
		var stackObj = $firebaseObject(stackRef);

		stackObj.$loaded().then(function(data) {
			$scope.stackName = stackObj.name;	
		});

		var cardsRef = new Firebase(FIREBASE_URL + '/stacks/' + $scope.stackId + '/cards');
		var cardsAry = $firebaseArray(cardsRef);

		cardsAry.$loaded().then(function(data) {
			$scope.cards = cardsAry;	
		});

		$scope.deleteStack = function() {
			var ref = new Firebase(FIREBASE_URL + '/users/' + authData.uid + '/stacks/' + $scope.stackId);
	    ref.remove();
	    $location.path('/user');
		}

		$scope.deleteCard = function( id ) {
			var record = new Firebase(FIREBASE_URL + '/stacks/' + $scope.stackId + '/cards/' + id);
			record.remove();
		}
  } // get authentication
	
});