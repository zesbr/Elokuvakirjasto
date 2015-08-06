
App.service('FirebaseService', function($firebase) {
    
	var ref = new Firebase('https://flickering-fire-1865.firebaseio.com/movies');
	var sync = $firebase(ref);
	var movies = sync.$asArray();

	this.all = function(){
		return movies;
 	}
	
	this.find = function(key, done){
	  movies.$loaded(function(){
	   	done(movies.$getRecord(key));
	  });
	}

 	this.add = function(movie){
     	movies.$add(movie);
	}

	this.update = function(movie){
     	movies.$save(movie);
	}

	this.delete = function(movie){
     	movies.$remove(movie);
	}

});