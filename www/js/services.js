angular.module('starter.services', ['firebase'])


.factory("Items", function($firebaseArray) {
  var comerciosRef = new Firebase("https://eurekacr.firebaseIO.com/comercios");
  var inventarioRef = new Firebase("https://eurekacr.firebaseIO.com/inventario");
  // return $firebaseArray(itemsRef);
  return {
	  	comerciosRef: function() {
	  		return comerciosRef;
	  	},
	  	inventarioRef: function() {
	  		return inventarioRef;
	  	}
	}
});