describe('Show movie', function(){
    
    var controller, scope;
    var FirebaseServiceMock, RouteParamsMock;

    beforeEach(function(){
        module('Elokuvakirjasto');
        
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
                get: function(key, done) {
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
        spyOn(FirebaseServiceMock, 'get').and.callThrough(); 
        spyOn(FirebaseServiceMock, 'add').and.callThrough(); 
        spyOn(FirebaseServiceMock, 'update').and.callThrough(); 
        spyOn(FirebaseServiceMock, 'delete').and.callThrough(); 

    	// Injektoi toteuttamasi kontrolleri tähän
        inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            scope.parent = { movies: FirebaseServiceMock.all() };
            controller = $controller('ShowMovieController', {
	           $scope: scope,
               $routePrams: RouteParamsMock,
	           FirebaseService: FirebaseServiceMock
            });
        });  
    });

    /*
    * Testaa alla esitettyjä toimintoja kontrollerissasi
    */

    /* 
    * Testaa, että Firebasesta (mockilta) saatu elokuva löytyy kontrollerista.
    * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota
    * käyttämällä toBeCalled-oletusta.
    */
    it('should show current movie from Firebase', function(){
        expect(scope.parent.movies.length).toBe(3);
        FirebaseServiceMock.get(RouteParamsMock.id, function(movie) {
            scope.movie = movie;
        });
        expect(scope.movie).toEqual({
            title: 'Pulp Fiction',
            year: 1994,
            director: 'Quentin Tarantino',
            description: '...'
        });
    });
    
});