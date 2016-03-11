angular.module('starter.controllers', ['starter.services'])

// .config(['localStorageServiceProvider', function(localStorageServiceProvider){
//     localStorageServiceProvider.setPrefix('ls');
//   }])
.controller('DashCtrl', function($scope) {

  var deploy = new Ionic.Deploy();

  // Update app code with new release from Ionic Deploy
  $scope.doUpdate = function() {
    deploy.update().then(function(res) {
      console.log('Ionic Deploy: Update Success! ', res);
    }, function(err) {
      console.log('Ionic Deploy: Update error! ', err);
    }, function(prog) {
      console.log('Ionic Deploy: Progress... ', prog);
    });
  };

  // Check Ionic Deploy for new code
  $scope.checkForUpdates = function() {
    console.log('Ionic Deploy: Checking for updates');
    deploy.check().then(function(hasUpdate) {
      console.log('Ionic Deploy: Update available: ' + hasUpdate);
      $scope.hasUpdate = hasUpdate;
    }, function(err) {
      console.error('Ionic Deploy: Unable to check for updates', err);
    });
  }
})

.controller('ChatsCtrl', function($scope, Items, $firebaseArray, $ionicModal) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.items = $firebaseArray(Items.itemsRef());

  // console.log($scope.items.$ref().child("-KCRO0UPFlH0zcJ9zX38").toString());
  console.log($scope.items);

  $scope.createTask = function (item) {
      var item = item;

      $scope.items.$add({
        "name": item.name,
        "description": item.description,
        "records": []
      });
      //close new task modal
      $scope.modal.hide();
  };

  // $scope.chats = Chats.all();
  // $scope.remove = function(item) {
  //   Items.remove(item);
  // };
 
  $ionicModal.fromTemplateUrl('templates/form-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Items, $firebaseArray) {

  $scope.items = $firebaseArray(Items.itemsRef());

  $scope.items.$loaded().then(function(){
    angular.forEach($scope.items, function(item) {
      if (item.$id === $stateParams.chatId ) {
        $scope.item = item;
        console.log($scope.item);
        return $scope.item;
      }
    })
  });

  // Detailed section

  $scope.addItems = function (merc) {
      var merc = merc;
      // var bdItem = Items.$getRecord($scope.item.$id);
      var bdItem = $firebaseArray(Items.item());
      console.log(bdItem);
      // Items.$getRecord($scope.item.$id).$add({
      //     "nombre": "arete",
      //     "cantidad": 2
      // });
      // bdItem.add({
      //     "nombre": "arete",
      //     "cantidad": 2
      // });
      //close new task modal
      // $scope.modal.hide();
  };


  $scope.Answers = {};

  $scope.Items = [
    {
        "Text": "Favorite color?",
        "Name": "ColorQuestion",
        "Options": ["Red", "Blue", "Green"]
    }
  ];
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
