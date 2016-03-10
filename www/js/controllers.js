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

.controller('ChatsCtrl', function($scope, Items, $ionicModal) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.items = Items;
  // $scope.Answers = {};

  // $scope.Items = [
  //   {
  //       "Text": "Favorite color?",
  //       "Name": "ColorQuestion",
  //       "Options": ["Red", "Blue", "Green"]
  //   }
  // ];

  $scope.createTask = function (item) {
      var item = item;

      $scope.items.$add({
        "name": item.name,
        "description": item.description
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

.controller('ChatDetailCtrl', function($scope, $stateParams, Items) {

  $scope.items = Items;

  $scope.items.get = function(chatId) {
    for (var i = 0; i < $scope.items.length; i++) {
      if ($scope.items[i].$id === chatId) {
        return $scope.items[i];
      }
    }
    return null;
  }
  $scope.item = $scope.items.get($stateParams.chatId);

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
