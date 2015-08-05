Elokuvakirjasto.controller('MovieController', function($scope, $location, FirebaseService) {

    $scope.movies = FirebaseService.all();
    $scope.newMovie = {
        title: '',
        year: '',
        director: '',
        description: ''
    };
    
    /**
     * Lisää uuden elokuvan elokuvakirjastoon
     */
    $scope.add = function() {  
        if (newMovieIsValid()) {     
            FirebaseService.add($scope.newMovie);
            $location.path('/');
        }
    };
    
    function newMovieIsValid() {
        if (!titleIsValid() || !directorIsValid() || !yearIsValid() || !descriptionIsValid()) {
            return false;
        }
        return true;
    }

    function titleIsValid() {
        if ($scope.newMovie.title == '') {
            return false;
        }
        return true;
    }
    
    function directorIsValid() {
        if ($scope.newMovie.director == '') {
            return false;
        }
        return true;
    }

    function yearIsValid() {
        if ($scope.newMovie.year == '') {
            return false;
        }
        return true;
    }

    function descriptionIsValid() {
        if ($scope.newMovie.description == '') {
            return false;
        }
        return true;
    }

});