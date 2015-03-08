myApp.controller('ReviewController', 
	function($scope, $firebase, $routeParams, $location, FIREBASE_URL) {
	$scope.stackId = $routeParams.sId;

	var cardsRef = new Firebase(FIREBASE_URL + '/stacks/' + $scope.stackId + '/cards');
	var cardsArray = $firebase(cardsRef).$asArray();

	cardsArray.$loaded().then(function(data) {	
		$scope.cards = cardsArray;	
	});

	$scope.checkAnswer = function() {
		if ($scope.cards[$scope.currentCard].answer == $scope.user.answer) {
			$scope.user.answer = '';
			$scope.currentCard++;
		}
	}

	$scope.showAnswer = function() {
		$scope.card.show = true;
	}
});