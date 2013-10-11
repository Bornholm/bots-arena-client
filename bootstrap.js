var GameClient = require('./lib/game-client.js');

var editor =  

var gameClient = new GameClient();

gameClient.initialize(function(err) {
  if(err) {
    gameClient.logger.error(err);
    process.exit(1);
  }
  gameClient.logger.log('Game client started !')
});


var fs = require('fs');

var document = window.document;
var CodeMirror = window.CodeMirror;
var PIXI = window.PIXI;

var editorEl = document.getElementById('editor');
var gridEl = document.getElementById('grid');

var renderer = new PIXI.WebGLRenderer(480, 360); 

gridEl.appendChild(renderer.view);

var editor = CodeMirror(editorEl, {
  value: fs.readFileSync('./lib/util/default-bot.js', 'utf8'),
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