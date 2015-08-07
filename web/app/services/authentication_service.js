App.service('AuthenticationService', function($firebase, $firebaseAuth) {
    var ref = new Firebase('https://flickering-fire-1865.firebaseio.com');
    var firebaseAuth = $firebaseAuth(ref);
    
    this.login = function(email, password){
        return firebaseAuth.$authWithPassword({
            email: email,
            password: password
        });
    }
    
    this.logout = function(){
        firebaseAuth.$unauth();
    }

    this.getUserLoggedIn = function(){
        return firebaseAuth.$getAuth();
    }

    this.createUser = function(email, password){
        return firebaseAuth.$createUser({
            email: email,
            password: password
        });
    }
    
    this.checkLoggedIn = function(){
        return firebaseAuth.$waitForAuth();
    }   
});