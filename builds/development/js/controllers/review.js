myApp.controller('ReviewController', 
	function($scope, $firebaseArray, $routeParams, $location, $timeout, FIREBASE_URL) {
	$scope.stackId = $routeParams.sId;

	var cardsRef = new Firebase(FIREBASE_URL + '/stacks/' + $scope.stackId + '/cards');
	var cardsAry = $firebaseArray(cardsRef);
	var timeout;

	$scope.current = 0;
	$scope.card = {};
	
	cardsAry.$loaded().then(function( data ) {	
		$scope.cards = cardsAry;

		$scope.$watch('current', function( newVal, oldVal ) {
			reset();
			$scope.card = $scope.cards[$scope.current];	
			
			if ($scope.current == ($scope.cards.length - 1)) {
				console.log('last card');
				$scope.last = true;
			} else if ($scope.current == 0) {
				console.log('first card');
				$scope.first = true;
			} else {
				$scope.first = null;
				$scope.last = null;
			}
		});
	}); // cards array loaded

	$scope.$watch('answer', function( userAnswer ) {
		if (timeout) $timeout.cancel(timeout);
		timeout = $timeout(function() {
			checkAnswer();
		}, 250);
	}); // call check user answer

	$scope.prevCard = function() {
		$scope.current--;
	}

	$scope.nextCard = function() {
		$scope.current++;
	}

	$scope.giveUp = function() {
		showAnswer();
	}

	var showAnswer = function() {
		$scope.card.show = true;
	}

	var checkAnswer = function() {
		if (angular.lowercase($scope.card.answer) == angular.lowercase($scope.answer)) {
			correctAnswer();
		}
	} //checkAnswer

	var correctAnswer = function() {
		showAnswer();
		$timeout(function() {
			$scope.nextCard();
		}, 3000);
	} //correctAnswer

	var reset = function() {
		$scope.card.show = null;
		$scope.answer = '';
	} //reset
});


