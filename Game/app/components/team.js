mainApp.component('team', {
  template: `
          <div layout="column" layout-align="center center">
              <div ng-repeat="player in $ctrl.players">
                {{player}}
              </div>
              <div ng-if="$ctrl.players.length<2">
                <md-button ng-click="$ctrl.addPlayer()" class="md-raised">Rejoindre</md-button>
              </div>
          </div>
`,
  controller: function teamCtrl() {
    this.players = [];

    this.addPlayer = function() {

    }
  }
});