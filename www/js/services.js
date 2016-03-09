angular.module('starter.services', ['firebase'])


.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://eurekacr.firebaseIO.com/items");
  return $firebaseArray(itemsRef);
})