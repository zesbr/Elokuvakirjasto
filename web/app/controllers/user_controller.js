App.controller('UserController', function($scope, $location, AuthenticationService){
    
    $scope.user = {
        email: '',
        password: ''
    };

    $scope.login = function(){
        AuthenticationService.login($scope.user.email, $scope.user.password)
        .then(function(){
                $location.path('/movies');
        })
        .catch(function(){
                $scope.message = 'Sähköposti tai salasana väärin. Yritä uudelleen.'
        });
    };

    $scope.register = function(){
        AuthenticationService.createUser($scope.user.email, $scope.user.password)
        .then(function(){
            AuthenticationService.login($scope.user.email, $scope.user.password)
            .then(function(){
                $location.path('/movies');
            });
        })
        .catch(function(){
            $scope.message = 'Tapahtui virhe! Yritä uudelleen.';
        });
    };
    
});


