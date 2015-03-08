myApp.controller('StackController', 
	function($scope, $rootScope, $firebase, $routeParams, $location, FIREBASE_URL) {
	$scope.stackId = $routeParams.sId;

	var user = localStorage.getItem('userId');
	var stackRef = new Firebase(FIREBASE_URL + '/users/' + user + '/stacks/' + $scope.stackId);
	var stackObj = $firebase(stackRef).$asObject();

	stackObj.$loaded().then(function(data) {
		$scope.stackName = stackObj.name;	
	});

	var cardsRef = new Firebase(FIREBASE_URL + '/stacks/' + $scope.stackId + '/cards');
	var cardsArray = $firebase(cardsRef).$asArray();

	cardsArray.$loaded().then(function(data) {
		$scope.cards = cardsArray;	
	});

	$scope.deleteStack = function() {
		var ref = new Firebase(FIREBASE_URL + '/users/' + user + '/stacks');
		var record = $firebase(ref);
    	record.$remove($scope.stackId);
    	$location.path('/user');

	}

	$scope.deleteCard = function(id) {
		var record = $firebase(cardsRef);
    	record.$remove(id);
	}
});