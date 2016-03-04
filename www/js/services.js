angular.module('starter.services', ['LocalStorageModule'])

.factory('Chats', function(localStorageService) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // var chats = [{
  //   id: 0,
  //   name: 'Tienda test',
  //   lastText: 'tienda avalorios tibas',
  //   face: 'img/ben.png'
  // }, {
  //   id: 1,
  //   name: 'Max Lynx',
  //   lastText: 'tienda en cartago',
  //   face: 'img/max.png'
  // }, {
  //   id: 2,
  //   name: 'Bradleyson',
  //   lastText: 'tienda en barrio mexico',
  //   face: 'img/adam.jpg'
  // }];
  var taskData = 'test';
   //initialize the tasks scope with empty array
  var tasks = [];

  //initialize the task scope with empty object
  var task = {};
  getTasks = function () {
      //fetches task from local storage
      if (localStorageService.get(taskData)) {
          tasks = localStorageService.get(taskData);
      } else {
          tasks = [];
      }
  };
  getTasks();

  return {
    all: function() {
      return tasks;
    },
    remove: function(chat) {
      tasks.splice(chat, 1);
      localStorageService.set(taskData, tasks);
    },
    get: function(chatId) {
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(chatId)) {
          return tasks[i];
        }
      }
      return null;
    },
    task: function () {
      return task;
    },
    taskData: function() {
      return taskData;
    }
  };
});
