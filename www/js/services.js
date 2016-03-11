angular.module('starter.services', ['firebase'])


.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://eurekacr.firebaseIO.com/items");
  var item = new Firebase("https://eurekacr.firebaseIO.com/items/-KCRO0UPFlH0zcJ9zX38");
  // return $firebaseArray(itemsRef);
  return {
	  	itemsRef: function() {
	  		return itemsRef;
	  	},
	  	item: function() {
	  		return item;
	  	}
	}
});