var App = require('armature').App;
var util = require('util');

module.exports = GameClient;

function GameClient(options) {

  this._options = options || {};
  this._initLogger();

  this.addInitSteps(
    this.loadPlugins,
    this._initCodeEditor,
    this._initGameView
  );

  this.addTermSteps(
    this.unloadPlugins
  );
}

util.inherits(GameClient, App);

var p = GameClient.prototype;

p.name = 'botsArena';

p._initGameView = function(done) {

  var GameView = require('./game-view');
  var viewContainer = this._options.viewContainer;

  if(!viewContainer) {
    return cb(new Error('Game view container is not defined !'));
  }

  var gameView = new GameView(this, {
    xScale: 1,
    yScale: 1
  });

  this._view = gameView;

  viewContainer.appendChild(gameView.getView());  

  gameView.loadAssets(
    ['./assets/sprites/bots/default.png', './assets/sprites/tiles/default.png'],
    function() {
      console.log('Assets loaded')
      gameView.startRendering();
      done();
    }
  );

};

p._initCodeEditor = function(done) {

  var fs = require('fs');
  var CodeMirror = window.CodeMirror;
  var editorContainer = this._options.editorContainer;

  if(!editorContainer) {
    return cb(new Error('Game view container is not defined !'));
  }

  var defaultCode = fs.readFileSync('./lib/util/default-bot-code.js', 'utf8');

  var editor = CodeMirror(editorContainer, {
    value: defaultCode,
    theme: 'lesser-dark',
    tabSize: 2,
    lineNumbers: true
  });

  this._codeEditor = editor;

  process.nextTick(done);

};

p._initLogger = function() {
  this.logger = console;
};