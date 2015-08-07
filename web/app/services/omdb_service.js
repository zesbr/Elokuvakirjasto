App.service('OMDBService', function($http) {
 	this.search = function(title, year){
 		return $http.get('http://www.omdbapi.com', { params: { s: title, y: year, type: 'movie' } });
 	}
});