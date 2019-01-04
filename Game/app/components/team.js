mainApp.component('team', {
  templateUrl: './app/components/views/team.html',
  bindings: {
    user: '<',
    joined: '=',
    onJoin: '&',
    resetTmp: '&',
    currentTeam: '@',
    team: '<',
    tempUser: '<',
  },
  controller: function teamCtrl($mdDialog) {
    this.players = [];
    this.showJoinButton = true

    this.$onChanges = function (changes) {

      if (changes.tempUser !== undefined && changes.tempUser.currentValue !== undefined) {
        if (changes.tempUser.currentValue.team === this.currentTeam) {
          this.players.push(changes.tempUser.currentValue)

          this.resetTmp()
        } else if (changes.tempUser.previousValue === this.currentTeam) {
          // remove the user from player list
        }
      }

      if (changes.team !== undefined) {
        if (changes.team.previousValue === undefined)
          return
        this.showJoinButton = !(changes.team.currentValue === this.currentTeam)

        if (changes.team.currentValue !== this.currentTeam && changes.team.currentValue !== changes.team.previousValue)
          for (let i = 0; i < this.players.length; i++)
            if (this.players[i].name === this.user.name)
              this.players.splice(i, 1)
      }
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
