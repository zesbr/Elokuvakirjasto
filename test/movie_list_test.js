describe('Movie list', function(){
    
    var controller, scope;
    var FirebaseServiceMock, RouteParamsMock;

    beforeEach(function(){   
        module('App');
        
        FirebaseServiceMock = (function(){
            var movies = [
                {
                    title: 'Pulp Fiction',
                    year: 1994,
                    director: 'Quentin Tarantino',
                    description: '...'
                },
                {
                    title: 'The Shawahank Redemption',
                    year: 1994,
                    director: 'Frank Darabont',
                    description: '...'
                },
                {
                    title: 'The Godfather',
                    year: 1972,
                    director: 'Francis Ford Coppola',
                    description: '...'
                }
            ];
            return {
                all: function() {
                    return movies;
                },
                find: function(key, done) {
                    if (key = '-Jvx9NcnhXjOzui5rcrX') {
                        done(movies[0]);
                    } else {
                        done(null);
                    }
                },
                add: function(movie) {
                    movies.push(movie);
                },
                update: function(movie) {
                    movies[function() {
                        movies.forEach(function(index, item) {
                            if (item.title == movie.title) {
                                return index;
                            }
                        });
                    }] = movie;
                },
                delete: function(movie) {
                    movies.splice(function(){
                        movies.forEach(function(index, item) {
                            if (item.title == movie.title) {
                                return index;
                            }
                        });
                    }, 1);
                }
            }
        })();

        RouteParamsMock = (function(){
            return {
                id: '-Jvx9NcnhXjOzui5rcrX'
            }
        });

        // Lisää vakoilijat
        spyOn(FirebaseServiceMock, 'all').and.callThrough();
        spyOn(FirebaseServiceMock, 'find').and.callThrough(); 
        spyOn(FirebaseServiceMock, 'add').and.callThrough(); 
        spyOn(FirebaseServiceMock, 'update').and.callThrough(); 
        spyOn(FirebaseServiceMock, 'delete').and.callThrough(); 

    	// Injektoi toteuttamasi kontrolleri tähän
        inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            controller = $controller('MovieController', {
                $scope: scope,
               $routeParams: RouteParamsMock,
                FirebaseService: FirebaseServiceMock
            });
        }); 
    });

    /*
    * Testaa alla esitettyjä toimintoja kontrollerissasi
    */

    /*
    * Testaa, että Firebasesta (mockilta) saadut elokuvat löytyvät konrollerista
    * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
    * käyttämällä toBeCalled-oletusta.
    */ 
    it('should list all movies from the Firebase', function(){
        expect(FirebaseServiceMock.all).toHaveBeenCalled();
        expect(scope.movies.length).toBe(3);
    });


    /* 
    * Testaa, että elokuvan pystyy poistamaan Firebasesta.
    * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
    * käyttämällä toBeCalled-oletusta.
    */
    it('should be able to remove a movie', function(){
        expect(scope.movies.length).toBe(3);
        FirebaseServiceMock.find(RouteParamsMock.id, function(movie) {
            scope.movie = movie;
        });
        scope.delete();
        expect(FirebaseServiceMock.delete).toHaveBeenCalled();
        expect(scope.movies.length).toBe(2);
    });
	
});