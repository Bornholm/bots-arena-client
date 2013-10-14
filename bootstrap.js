var document = window.document;
var getById = document.getElementById.bind(document);
var GameClient = require('./lib/game-client.js');

var gameClient = new GameClient({
  viewContainer: getById('game-view'),
  editorContainer: getById('editor')
});

gameClient.initialize(function(err) {
  if(err) {
    gameClient.logger.error(err.stack);
    process.exit(1);
  }
  gameClient.logger.log('Game client started !');
});


/*var fs = require('fs');

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

evalCode(editor.getValue());*/