App.config(function($routeProvider){
  
    $routeProvider
    
    .when('/', {
        controller: 'MovieController',
        templateUrl: 'app/views/index.html',
        resolve: {
            currentAuth: function(AuthenticationService) {
                return AuthenticationService.checkLoggedIn();
            }
        }
    })
    
    .when('/login', {
        controller: 'UserController',
        templateUrl: 'app/views/login.html'
    })
    
    .when('/registration', {
        controller: 'UserController',
        templateUrl: 'app/views/registration.html'
    })
    
    .when('/movies', {
        redirectTo: '/'
    })
    
    .when('/movies/new', {
        controller: 'MovieController',
        templateUrl: 'app/views/new.html',
        resolve: {
            currentAuth: function(AuthenticationService) {
                return AuthenticationService.checkLoggedIn(); 
            }
        }
        
    })
    
    .when('/movies/:id', {
        controller: 'MovieController',
        templateUrl: 'app/views/show.html',
        resolve: {
            currentAuth: function(AuthenticationService) {
                return AuthenticationService.checkLoggedIn();
            }
        }
    })
    
    .when('/movies/:id/edit', { 
        controller: 'MovieController',
        templateUrl: 'app/views/edit.html',
        resolve: {
            currentAuth: function(AuthenticationService) {
                return AuthenticationService.checkLoggedIn();
            }
        }
        
    })
    
    .otherwise({
        redirectTo: '/'
    });   

});