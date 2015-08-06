App.controller('MovieController', function($scope, $location, $routeParams, FirebaseService) {
    $scope.movies = FirebaseService.all();  
    if ($routeParams.id) {
        FirebaseService.find($routeParams.id, function(movie) {
            $scope.movie = movie;
        });
    } else {
        $scope.movie = {
            title: '',
            year: '',
            director: '',
            description: ''
        };  
    }

    $scope.add = function() { 
        if (valid()) {
            FirebaseService.add($scope.movie);
            $location.path('/');
        }
    }

    $scope.update = function() {
        if (valid()) {
            FirebaseService.update($scope.movie);
            $location.path('/');
        }
    }

    $scope.delete = function() {
        FirebaseService.delete($scope.movie);
        $location.path('/');
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