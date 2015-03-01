describe('Show movie', function(){
	var controller, scope;

	var FirebaseServiceMock, RouteParamsMock;

  	beforeEach(function(){
  		// Lisää moduulisi nimi tähän
    	module('MyAwesomeModule');

    	FirebaseServiceMock = (function(){
			return {
				// Toteuta FirebaseServicen mockatut metodit tähän
			}
		})();

		RouteParamsMock = (function(){
			return {
				// Toteuta mockattu $routeParams-muuttuja tähän
			}
		});

    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
	      scope = $rootScope.$new();
	      // Muista vaihtaa oikea kontrollerin nimi!
	      controller = $controller('MyAwesomeController', {
	        $scope: scope,
	        FirebaseService: FirebaseServiceMock,
	       	$routePrams: RouteParamsMock
	      });
	    });

	    // Lisää vakoilijat
	    // spyOn(FirebaseServiceMock, 'jokuFunktio');
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
		expect(true).toBe(false);
	});
});