App.run(function(AuthenticationService, $rootScope, $location, $route, $window){ 
    $rootScope.logout = function(){
        AuthenticationService.logout();
        $location.path('/movies');
    };
    $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn();
});