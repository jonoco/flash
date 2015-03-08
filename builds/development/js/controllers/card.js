myApp.controller('CardController', 
function($scope, $firebase, $location, $routeParams, FIREBASE_URL) {
	
	$scope.stackId = $routeParams.sId;
	var cardsRef = new Firebase(FIREBASE_URL + '/stacks/' + $scope.stackId + '/cards');

	$scope.goBack = 'stack/' + $scope.stackId;

	if (typeof $routeParams.cId != 'undefined') {
		$scope.cardId = $routeParams.cId;
		var ref = new Firebase(FIREBASE_URL + '/stacks/' + $scope.stackId + '/cards/' + $scope.cardId);
		cardObj = $firebase(ref).$asObject();
	
		cardObj.$loaded().then(function() {
			$scope.card = cardObj;
		});
	
		$scope.editCard = function() {
	  		var cardInfo = $firebase(ref);

			var myData = {
				memory: $scope.card.memory,
				answer: $scope.card.answer,
				date: Firebase.ServerValue.TIMESTAMP
			};

			cardInfo.$set(myData).then(function() {
		    	$location.path('/user');
		  	});
		}
	} else { // editing card
		$scope.editCard = function() {
		  	var cardInfo = $firebase(cardsRef);

			var myData = {
				memory: $scope.card.memory,
				answer: $scope.card.answer,
				date: Firebase.ServerValue.TIMESTAMP
			};

			cardInfo.$push(myData).then(function() {
		    	$scope.card.memory = '';
		    	$scope.card.answer = '';
		    	$scope.message = 'card added';
		  	});
		}
	} // adding card

});