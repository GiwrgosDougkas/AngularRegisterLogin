myApp.factory('Authentication',
  ['$rootScope', '$location' , '$firebaseAuth','$firebaseObject',
  function($rootScope, $location,$firebaseAuth,$firebaseObject) {

  var ref = firebase.database().ref();
  var auth = $firebaseAuth();
  var obj;
  auth.$onAuthStateChanged(function(authUser){
    if(authUser){
        var userRef= ref.child('users').child(authUser.uid);
        var userObject=$firebaseObject(userRef);    
        $rootScope.currentUser= userObject;
    }else{
        $rootScope.currentUser="";
    }
  }) 

  obj={
    requireAuth:function(){
        return auth.$requireSignIn();  
    },

    logout:function(){
        return auth.$signOut();
    },

    login:function(user){
        auth.$signInWithEmailAndPassword(
            user.email,
            user.password
        ).then(function(user){
            $location.path('/success');
        }).catch(function(err){
            $rootScope.message=err.message;
        })
    },

    register:function(user){
        auth.$createUserWithEmailAndPassword(
            user.email,
            user.password
        ).then(function(regUser){
            ref.child('users').child(regUser.uid).set({
                date:firebase.database.ServerValue.TIMESTAMP,
                regUser:regUser.uid,
                name:user.name,
                lastname:user.lastname,
                email:user.email
                
            });
            $rootScope.message="hello " +user.name;
            obj.login();
        }).catch(function(err){
            $rootScope.message=err.message;
        })
        
    }
  }
  return obj;

  

}]);