var PIXI = window.PIXI;

module.exports = GameView;

function GameView(gameClient, options) {

  this._options = options || {};
  this._gameClient = gameClient;
  this._offset = {x: 0, y: 0};
  this._keepRendering = false;

  this._initRenderer();
  this._initGameListeners();
  
}

// Helpers

function removeAll() {
  var children = this.children;
  children.forEach(this.removeChild.bind(this));
}

var p = GameView.prototype;

p.getView = function() {
  return this._renderer.view;
};

p.loadAssets = function(urls, done) {
  var loader = new PIXI.AssetLoader(urls);
  loader.on('complete', done);
  console.log(loader);
};

p._initRenderer = function() {

  this._renderer = new PIXI.WebGLRenderer(480, 360);
  var stage = this._stage = new PIXI.Stage();

  var layers = this._layers = {};

  layers.background = new PIXI.DisplayObjectContainer();
  layers.actors = new PIXI.DisplayObjectContainer();
  layers.effects = new PIXI.DisplayObjectContainer();

  stage.addChild(layers.background);
  stage.addChild(layers.actors);
  stage.addChild(layers.effects);

};

p._initGameListeners = function() {
  // TODO
};

p.startRendering = function() {
  this._updateOffset();
  this._updateBackground();
  this._addBot();
  if(!this._keepRendering) {
    var isRenderBinded = typeof this._renderBinded === 'function';
    if(!isRenderBinded) {
      this._renderBinded = this._render.bind(this);
    }
    this._keepRendering = true;
    this._render();
  }
};

p._render = function() {
  this._renderer.render(this._stage);
  if(this._keepRendering) {
    window.requestAnimationFrame(this._renderBinded);
  }
};

p._updateOffset = function() {
  var layers = this._layers;
  var offset = this._offset;
  var layerName;
  var layer;
  for(layerName in layers) {
    if(layers.hasOwnProperty(layerName)) {
      layer = layers[layerName];
      layer.position.x = offset.x;
      layer.position.y = offset.y;
    }
  }
};

p._addBot = function(bot) {
  var tileSize = this._options.tileSize || 24;
  var halfSize = tileSize/2;
  var actorsLayer = this._layers.actors;
  var xScale = this._options.xScale || 1;
  var yScale = this._options.yScale || 1;
  var actor = PIXI.Sprite.fromImage('./assets/sprites/bots/default.png');
  actor.position.x = (0 + halfSize - actor.width/2) * xScale;
  // actor.position.x = bot.getPosition().x * tileSize + tileSize/2 - actor.width/2;
  actor.position.y = (0 + halfSize - actor.height/2) * yScale;
  actor.scale.x = xScale;
  actor.scale.y = yScale;
  // actor.position.y = bot.getPosition().y * tileSize + tileSize/2 - actor.height/2;
  actorsLayer.addChild(actor);
};

p._updateBackground = function() {

  var gameClient = this._gameClient;
  var layer = this._layers.background;

  removeAll.call(layer);

  //var gridSize =  gameClient.getGridSize();
  var gridSize =  {columns: 40, rows: 40};
  var cell;
  var tile;
  var tileSize = this._options.tileSize || 24;
  var xScale = this._options.xScale || 1;
  var yScale = this._options.yScale || 1;

  var i,j;
  for(i = 0; i < gridSize.columns; ++i) {
    for(j = 0; j < gridSize.rows; ++j) {
      //cell = gameClient.getCell(i, j);
      //tile = PIXI.Sprite.fromFrame(cell.getBackgroundFrameId());
      tile = PIXI.Sprite.fromImage('./assets/sprites/tiles/default.png');
      tile.position.x = i * tileSize * xScale;
      tile.position.y = j * tileSize * yScale;
      tile.scale.x = xScale;
      tile.scale.y = yScale;
      layer.addChild(tile);
    }
  }

};