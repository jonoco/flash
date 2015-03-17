myApp.factory('cardService', function(
	$firebaseObject, $location, FIREBASE_URL){

	var card = {};

	var myObject = {
		editCard : function( stack, card ) {
			var ref = new Firebase(FIREBASE_URL + '/stacks/' + stack + '/cards/' + card);
			cardObj = $firebaseObject(ref);

			cardObj.$loaded(function() {
				card = cardObj;
				$location.path('/stack/' + stack + '/edit');
				console.log('card loaded at service');
				console.log(card);
			});
		},// ready card for editing

		getCard : function() {
			return card;	
		},// get card to edit

		addCard : function() {

		},// add card to stack
		saveCard : function() {

		}// save edited card
	}// myObject

	return myObject; 
});