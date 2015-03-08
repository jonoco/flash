myApp.factory('Authentication', function($firebase, 
  $firebaseSimpleLogin, FIREBASE_URL, $rootScope, $location) {

  var ref = new Firebase(FIREBASE_URL);
  var simpleLogin = $firebaseSimpleLogin(ref);

  var myObject = {

    login : function(user) {

      var userRef = new Firebase(FIREBASE_URL + '/users/' + user.uid);
      var userObj = $firebase(userRef).$asObject();

      userObj.$loaded().then(function() {
        $rootScope.currentUser = userObj;
      });

      return simpleLogin.$login('password', {
        email: user.email,
        password: user.password
      }).then(function(user) {
        $rootScope.user.uid = user.uid;
        localStorage.setItem('userId', user.uid);
      });
    }, //login

    register : function(user) {
      return simpleLogin.$createUser(user.email, user.password)
      .then(function(regUser){
        $rootScope.user.uid = regUser.uid;
        localStorage.setItem('userId', regUser.uid);

        var ref = new Firebase(FIREBASE_URL + 'users');
        var firebaseUsers = $firebase(ref);

        var userInfo = {
          date: Firebase.ServerValue.TIMESTAMP,
          regUser: regUser.uid,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email
        }
        firebaseUsers.$set(regUser.uid, userInfo);  
      }); //add user
    }, //register

    logout : function() {
      localStorage.clear();
      $rootScope.user.uid = '';
      return simpleLogin.$logout();
    }, //logout

    signedIn: function() {
      return simpleLogin.user != null;
    } //signedIn

  } //myObject

  //add the function to the rootScope

  $rootScope.signedIn = function() {
    return myObject.signedIn();
  }

  return myObject;
});