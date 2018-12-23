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
  var config = {
    type: Phaser.AUTO,
    width: 800,
    parent: 'game-app',
    height: 600,
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  var game = new Phaser.Game(config);

  function preload() {
    this.load.setBaseURL('http://127.0.0.1:8081');
    // http-server Game/images --cors //
    this.load.image('bottom_left', 'bl.png');
    this.load.image('bottom_right', 'br.png');
    this.load.image('upper_left', 'ul.png');
    this.load.image('upper_right', 'ur.png');
    this.load.image('sky', 'gradient1.png');
  }

  function create() {
    this.add.image(400, 300, 'sky')
  }

  function update() {}

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  }
})