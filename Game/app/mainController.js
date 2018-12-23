var mainApp = angular.module('mainApp', ["ngRoute", "ngMaterial", "ngAnimate"])

mainApp.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "views/home.html",
      controller: "homeCtrl"
    })
    .otherwise({
      templateUrl: "views/home.html",
      controller: "homeCtrl"
    })
})
mainApp.controller('menuCtrl', function($scope, $http, $location, $mdToast) {
  $scope.menuItems = [{
    caption: "Game",
    link: "#!/home"
  }]
})

mainApp.controller('homeCtrl', function($scope, $http, $location, $mdSidenav, $mdToast) {
  $scope.toggleSidenav = buildToggler('closeEventsDisabled');


  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  }
})