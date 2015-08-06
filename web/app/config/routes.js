App.config(function($routeProvider){
  $routeProvider
  .when('/', {
    controller: 'MovieController',
    templateUrl: 'app/views/movies_list.html'
  })
  .when('/movies', {
    controller: 'MovieController',
    templateUrl: 'app/views/movies_list.html'
  })
  .when('/movies/new', {
    controller: 'MovieController',
    templateUrl: 'app/views/movies_new.html'
  })
  .when('/movies/:id', {
    controller: 'MovieController',
    templateUrl: 'app/views/movies_show.html'
  })
  .when('/movies/:id/edit', {
    controller: 'MovieController',
    templateUrl: 'app/views/movies_edit.html'
  })
  .otherwise({
    redirectTo: '/'
  });   
});
