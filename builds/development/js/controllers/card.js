myApp.controller('CardController', 
function($scope, $firebaseObject, $location, $routeParams, FIREBASE_URL) {
	
	$scope.stackId = $routeParams.sId;
	$scope.goBack = 'stack/' + $scope.stackId;

	var ref = new Firebase(FIREBASE_URL + '/stacks/' + $scope.stackId + '/cards');
	
	if ($routeParams.cId !== 'undefined'){
		$scope.cardId = $routeParams.cId;
		var editRef = new Firebase(FIREBASE_URL + '/stacks/' + $scope.stackId + '/cards/' + $scope.cardId);
		var cardObj = $firebaseObject(editRef);

		cardObj.$loaded(function() {
			$scope.card = cardObj;
		});
	} //editing card

	$scope.editCard = function() {
		if (!$scope.card.image) {
			$scope.card.image = null;
		}

		var myData = {
			memory: $scope.card.memory,
			image: $scope.card.image,
			answer: $scope.card.answer,
			date: Firebase.ServerValue.TIMESTAMP
		};

		editRef.set(myData, function() {
	    $location.path('/stack/' + $scope.stackId);
	  });
	}; //editCard

	$scope.addCard = function() {
		if (!$scope.card.image) {
			$scope.card.image = null;
		}

		var myData = {
			memory: $scope.card.memory,
			image: $scope.card.image,
			answer: $scope.card.answer,
			date: Firebase.ServerValue.TIMESTAMP
		};

		ref.push(myData, function() {
    	$scope.card.memory = '';
    	$scope.card.image = '';
    	$scope.card.answer = '';
    	$scope.message = 'card added';
    	$scope.$apply();
	  });
	};// addCard
	 

});