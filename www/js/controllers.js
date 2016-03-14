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
  $scope.comercios = $firebaseArray(Items.comerciosRef());

  
  // console.log($scope.comercios);

  $scope.crearComercio = function (item) {
      $scope.item = item;

      $scope.comercios.$add({
        "name": $scope.item.name,
        "description": $scope.item.description
      });
      //close new task modal
      $scope.modal.hide();
  };

  // $scope.chats = Chats.all();
  // $scope.remove = function(item) {
  //   Items.remove(item);
  // };
 
  $ionicModal.fromTemplateUrl('templates/form-modal-comercios.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.item = {};
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  // $scope.$on('$destroy', function() {
  //   $scope.modal.remove();
  // });
  // Execute action on hide modal
  // $scope.$on('modal.hidden', function() {
  //   // Execute action
  // });
  // // Execute action on remove modal
  // $scope.$on('modal.removed', function() {
  //   // Execute action
  // });

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Items, $firebaseArray, $ionicModal) {
  $scope.$on('$ionicView.enter', function(e) {
  console.log(e);

    $ionicModal.fromTemplateUrl('templates/form-modal-comercio-articulos.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.item = {};
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //getting db comercios
    $scope.comercios = $firebaseArray(Items.comerciosRef());

    $scope.comercios.$loaded().then(function(){
      angular.forEach($scope.comercios, function(item) {
        if (item.$id === $stateParams.chatId ) {
          $scope.comercio = item;
          $scope.invComercio = item.articulos;
          // console.log($scope.comercio);
          // return $scope.comercio;
        }
      })
    });

    // console.log($stateParams.chatId);
    // Detailed section
    $scope.inventario = $firebaseArray(Items.inventarioRef());
    // console.log($scope.inventario);
    $scope.Answers = {};
    $scope.artComercio = [];

    $scope.inventario.$loaded().then(function(){

      angular.forEach($scope.inventario, function(articulo) {
        // if (articulo.$id === $stateParams.chatId ) {
          $scope.artInventario = articulo;
          // console.log($scope.artInventario);
          $scope.artComercio.push($scope.artInventario.nombre);
          // console.log($scope.artComercio);
          // console.log($scope.comercio);
          // return $scope.comercio;
        // }
      })

    });

      $scope.addItems = function (item) {
      var itemName = $scope.Answers.nombre;
      console.log(itemName);
      // console.log($scope.items.$ref().child($stateParams.chatId).toString());
      $scope.currentId = $scope.comercios.$ref().child($stateParams.chatId);
      //articulos de cada comercio
      $scope.articulos = $scope.currentId.child("articulos");
      $scope.items =  $scope.articulos.child(itemName);
      $scope.items.update({

              name: itemName,
              quantity: item.quantity,
              price: 2500,
              type: "anillo"  
          
      });
      // console.log($scope.Answers);
      // console.log($scope.Answers.nombre);
      // console.log($scope.currentId);
      $scope.modal.hide();
    };

  });
})

.controller('AccountCtrl', function($scope, $ionicModal, Items, $firebaseArray) {

    $scope.inventario = $firebaseArray(Items.inventarioRef());
    console.log($scope.inventario);

    // Inventario modal
   $ionicModal.fromTemplateUrl('templates/form-modal-inventario.html', {
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

  //agregar articulos a inventario
   $scope.agregarInventario = function (articulo) {
      var articulo = articulo;

      $scope.inventario.$add({
        "nombre": articulo.nombre,
        "precio": articulo.precio
      });
      //close new task modal
      
      $scope.modal.hide();
  };

  //going through inventario obj
  //  $scope.inventario.$loaded().then(function(){
  //   angular.forEach($scope.inventario, function(item) {
  //     if (item.$id === $stateParams.chatId ) {
  //       $scope.comercio = item;
  //       // console.log($scope.comercio);
  //       // return $scope.comercio;
  //     }
  //   })
  // });
});
