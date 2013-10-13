var document = window.document;

// Init game client

var GameClient = require('./lib/game-client.js');
var gameClient = new GameClient();

// Init game view

var GameView = require('./lib/game-view.js');
var gameView = new GameView(gameClient);
var gridEl = document.getElementById('grid');

gridEl.appendChild(gameView.getView());

gameClient.initialize(function(err) {
  if(err) {
    gameClient.logger.error(err.stack);
    process.exit(1);
  }
  gameView.startRendering();
  gameClient.logger.log('Game client started !');
});


var fs = require('fs');
var CodeMirror = window.CodeMirror;
var editorEl = document.getElementById('editor');

var editor = CodeMirror(editorEl, {
  value: fs.readFileSync('./lib/util/default-bot-code.js', 'utf8'),
  theme: 'lesser-dark',
  tabSize: 2,
  lineNumbers: true
});

var codeExport;
var game = {};
var bot = {};

function evalCode(code) {
  try {
    var fn = new Function('game', 'bot', code);
    codeExport = {};
    fn.call(codeExport, game, bot);
    console.log(codeExport);
  } catch(err) {
    console.error(err);
  }
};

editor.on('change', function() {
  evalCode(editor.getValue());
});

evalCode(editor.getValue());