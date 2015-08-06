describe('Add movie', function(){

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
    * Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
    * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
    * on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
    * toBeCalled-oletusta.
    */
    it('should be able to add a movie by its name, director, release date and description', function(){
        expect(scope.movies.length).toBe(3);
        scope.movie = {
            title: 'The Godfather: Part II',
            year: 1974,
            director: 'Francis Ford Coppola',
            description: '...'
        };
        scope.add();
        expect(FirebaseServiceMock.add).toHaveBeenCalled();
        expect(scope.movies.length).toBe(4);
    });

    /*	
    * Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
    * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
    * EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
    * not.toBeCalled-oletusta (muista not-negaatio!).
    */
    it('should not be able to add a movie if its name, director, release date or description is empty', function(){
        expect(scope.movies.length).toBe(3);
        scope.movie = {
            title: '',
            year: '',
            director: '',
            description: ''
        };
        scope.add();
        expect(FirebaseServiceMock.add).not.toHaveBeenCalled()
        expect(scope.movies.length).toBe(3);
    });

});