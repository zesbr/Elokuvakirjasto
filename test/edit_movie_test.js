describe('Edit movie', function(){

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
            controller = $controller('EditMovieController', {
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
    * Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
    * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
    * käyttämällä toBeCalled-oletusta.
    */
    it('should fill the edit form with the current information about the movie', function(){
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
    })

    /* 
    * Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
    * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
    * käyttämällä toBeCalled-oletusta.
    */
    it('should be able to edit a movie by its name, director, release date and description', function(){
        expect(scope.parent.movies.length).toBe(3);
        FirebaseServiceMock.get(RouteParamsMock.id, function(movie) {
            scope.movie = movie;
        }); 
        scope.movie.description = ':)';
        scope.update();
        expect(FirebaseServiceMock.update).toHaveBeenCalled();
        
        FirebaseServiceMock.get(RouteParamsMock.id, function(movie) {
            scope.movie = movie;
        });
        expect(scope.movie).toEqual({
            title: 'Pulp Fiction',
            year: 1994,
            director: 'Quentin Tarantino',
            description: ':)'
        });
    });

    /*
    * Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
    * Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
    * käyttämällä not.toBeCalled-oletusta.
    */
    it('should not be able to edit a movie if its name, director, release date or description is empty', function(){
        expect(scope.parent.movies.length).toBe(3);
        FirebaseServiceMock.get(RouteParamsMock.id, function(movie) {
            scope.movie = movie;
        });
        scope.movie = {
            title: '',
            year: '',
            director: '',
            description: ''
        };
        scope.update();
        expect(FirebaseServiceMock.update).not.toHaveBeenCalled();
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