describe('Movie list', function(){
    
    var controller, scope;
    var FirebaseServiceMock;

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
                    add: function(movie) {
                            movies.push(movie);
                    }
            }
		})();

		// Lisää vakoilijat
		spyOn(FirebaseServiceMock, 'all').and.callThrough();
   	spyOn(FirebaseServiceMock, 'add').and.callThrough();

    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
	      scope = $rootScope.$new();
	      // Muista vaihtaa oikea kontrollerin nimi!
	      controller = $controller('MovieController', {
	        $scope: scope,
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
            expect(scope.movies.length).toBe(3);
	});

	it('should be able to add a movie to Firebase', function(){
		expect(scope.movies.length).toBe(3);
		scope.newMovie.title = 'Fight Club';
		scope.newMovie.year = 1999;
		scope.newMovie.director = "David Fincher";
		scope.newMovie.description = '...';
		var movie = scope.newMovie;
		scope.add();
		expect(scope.movies.length).toBe(4);
		expect(scope.movies[3]).toBe(movie);
	});

	it('should not be able to add an empty movie to Firebase', function(){
		expect(scope.movies.length).toBe(3);
		scope.add();
		expect(scope.movies.length).toBe(3);
	});

	it('should initially call all-function', function(){
 		expect(FirebaseServiceMock.all).toHaveBeenCalled();
  	});

	/* 
	* Testaa, että elokuvan pystyy poistamaan Firebasesta.
	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should be able to remove a movie', function(){
		expect(true).toBe(false);
	});
	
});