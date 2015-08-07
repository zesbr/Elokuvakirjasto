App.controller('MovieController', function($scope, $rootScope, $location, $routeParams, FirebaseService, OMDBService, AuthenticationService) {
    $scope.movies = FirebaseService.all();
    
    $scope.search = function() {
        OMDBService.search($scope.title, $scope.year).success(function(results){
            $scope.results = results.Search;
        });
    }
});

App.controller('ShowMovieController', function($scope, $location, $routeParams, FirebaseService) {
    FirebaseService.get($routeParams.id, function(result) { 
        $scope.movie = result; 
    });
});

App.controller('AddMovieController', function($scope, $rootScope, $location, $routeParams, FirebaseService) {
    if (!$rootScope.userLoggedIn) {
        $location.path('/');
    }

    $scope.movie = {
        title: '',
        year: '',
        director: '',
        description: ''
    };

    $scope.add = function() { 
        console.log("adding..");
        if (valid()) {
            FirebaseService.add($scope.movie);
            $location.path('/');  
        } else {
            $scope.message = 'Elokuva ei ole validi!';
        } 
    }

    function valid() {
        if ($scope.movie.title == '') {
            return false;
        }
        if ($scope.movie.year == '') {
            return false;
        }
        if ($scope.movie.director == '') {
            return false;
        }
        if ($scope.movie.description == '') {
            return false;
        }
        return true;
    }
});

App.controller('EditMovieController', function($scope, $rootScope, $location, $routeParams, FirebaseService) {
    if (!$rootScope.userLoggedIn) {
        $location.path('/');
    }

    FirebaseService.get($routeParams.id, function(result) { 
        $scope.movie = result; 
    });

    $scope.update = function() {
        if (valid()) {
            FirebaseService.update($scope.movie);
            $location.path('/');
        } else {
            $scope.message = 'Elokuva ei ole validi!';
        } 
    }

    function valid() {
        if ($scope.movie.title == '') {
            return false;
        }
        if ($scope.movie.year == '') {
            return false;
        }
        if ($scope.movie.director == '') {
            return false;
        }
        if ($scope.movie.description == '') {
            return false;
        }
        return true;
    }
});

App.controller('DeleteMovieController', function($scope, $rootScope, $location, $routeParams, FirebaseService) {
    $scope.delete = function(movie) {
        if (!$rootScope.userLoggedIn) {
            $location.path('/');
        }
        FirebaseService.delete(movie);
        $location.path('/');
    }
});