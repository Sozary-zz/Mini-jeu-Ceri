mainApp.component('team', {
  templateUrl: './app/components/views/team.html',
  bindings: {
    user: '=',
    joined: '=',
    onJoin: '&',
  },
  controller: function teamCtrl($mdDialog) {
    this.players = [];
    this.showJoinButton = true

    this.$onChanges = function (changes) {
      // if (changes.joined)
    }

    this.getInfo = function (player, $event) {
      $mdDialog.show(
        $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('Joueur')
        .textContent('Cette personne est le joueur ' + player.name)
        .ok('Ok!')
        .targetEvent($event)
      );
    }

    this.addPlayer = () => {
      this.players.push(this.user)
      this.showJoinButton = false
      this.onJoin()
    }
  }
});
