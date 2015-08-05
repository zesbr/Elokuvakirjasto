Elokuvakirjasto.config(function($routeProvider){
    
    $routeProvider
    .when('/', {
      controller: 'MovieController',
      templateUrl: 'app/views/movies.list.html'
    })
    .when('/movies', {
      controller: 'MovieController',
      templateUrl: 'app/views/movies.list.html'
    })
    .when('/movies/new', {
      controller: 'MovieController',
      templateUrl: 'app/views/movies.new.html'
    })
    .otherwise({
      redirectTo: '/'
    });
    
});
