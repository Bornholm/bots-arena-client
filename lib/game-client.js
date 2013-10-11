var App = require('armature').App;
var util = require('util');

module.exports = GameClient;

function GameClient() {
  this._initLogger();
  this.addInitSteps(
    this.loadPlugins
  );
  this.addTermSteps(
    this.unloadPlugins
  );
}

util.inherits(GameClient, App);

var p = GameClient.prototype;

p.name = 'botsArena';

p._initLogger = function() {
  this.logger = console;
};



