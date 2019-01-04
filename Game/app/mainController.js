var mainApp = angular.module('mainApp', ["ngRoute", "ngMaterial", "ngAnimate"])

mainApp.config(function ($routeProvider) {
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
mainApp.controller('menuCtrl', function ($scope, $http, $location, $mdToast) {
  $scope.menuItems = [{
    caption: "Game",
    link: "#!/home"
  }]
})
mainApp.controller('indexCtrl', function ($scope, $mdDialog, $http, $location, $mdToast) {
  var self = this
  $scope.tooMuchUser = function () {
    var confirm = $mdDialog.alert()
      .clickOutsideToClose(false)
      .title('Une erreur est survenue')
      .textContent('Trop de joueurs sont connectés simultanément, veuillez revenir plus tard.')
      .ok('Ça marche!')
    $mdDialog.show(confirm).then(function () {}, function () {});
  }
  $scope.promptUsername = function () {
    var confirm = $mdDialog.prompt()
      .title('Identifiant')
      .textContent('Quel identifiant voulez-vous choisir pour ce jeu?')
      .placeholder('Indentifiant')
      .required(true)
      .ok('Valider')
      .cancel('Je suis anonyme!')

    $mdDialog.show(confirm).then(function (result) {
      socket.emit("given_user", {
        user: result
      })
    }, function () {
      window.location.href = "http://localhost:8080/"

    });
  }
})

mainApp.controller('homeCtrl', function ($scope, $http, $location, $mdSidenav, $mdToast) {
  $scope.toggleSidenav = buildToggler('closeEventsDisabled');
  $scope.id
  $scope.numberOfPlayers = 0
  $scope.users = {}
  socket.on('user_ok', (data) => {

    $scope.numberOfPlayers++
    $scope.users[data.current.id] = {
      name: data.current.name,
      avatar: data.current.avatar,
      team: undefined
    }
    $scope.id = data.current.id

    for (let i = 0; i < data.existing.length; i++) {
      $scope.numberOfPlayers++
      $scope.users[data.existing[i].id] = {
        name: data.existing[i].name,
        avatar: data.existing[i].avatar,
        team: undefined
      }
    }

    $scope.$apply();
  });

  socket.on('user_left', (user_id) => {

    for (let user in $scope.users)
      if (user === user_id) {
        $scope.numberOfPlayers--
        delete $scope.users[user]
      }
  });

  socket.on('new_user', (user) => {
    $scope.numberOfPlayers++
    $scope.users[user.id] = {
      name: user.name,
      avatar: user.avatar,
      team: undefined
    }
    $scope.$apply();
  });


  $scope.aJoined = false
  $scope.bJoined = false

  var config = {
    type: Phaser.AUTO,
    width: $(window).width() * .7,
    parent: 'game-app',
    height: $(window).width() * .4,
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  var game = new Phaser.Game(config);

  function preload() {
    this.load.setBaseURL('http://127.0.0.1:8081');
    this.load.image('bottom_left', 'bl.png');
    this.load.image('bottom_right', 'br.png');
    this.load.image('upper_left', 'ul.png');
    this.load.image('upper_right', 'ur.png');
    this.load.image('eevee', 'eevee.png');
    this.load.image('pikachu', 'pikachu.png');
    this.load.image('jigglypuff', 'jigglypuff.png');
    this.load.image('squirtle', 'squirtle.png');
    this.load.image('sky', 'gradient1.png');
  }
  $scope.team = undefined

  $scope.joinATeam = function () {
    $scope.team = "a"
  }
  $scope.joinBTeam = function () {
    $scope.team = "b"

  }

  function create() {
    this.add.image(400, 300, 'sky')
  }

  function update() {}

  function buildToggler(componentId) {
    return function () {
      $mdSidenav(componentId).toggle();
    };
  }
})
