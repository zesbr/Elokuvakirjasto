
Elokuvakirjasto.service('FirebaseService', function($firebase) {
    
	var ref = new Firebase('https://flickering-fire-1865.firebaseio.com/movies');
	var sync = $firebase(ref);
	var movies = sync.$asArray();

	this.all = function(){
		return movies;
 	};
    
 	this.add = function(movie){
 		console.log("lets try");
     	movies.$add(movie);
	};
    
});