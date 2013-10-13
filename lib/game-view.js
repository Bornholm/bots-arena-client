var PIXI = window.PIXI;

module.exports = GameView;

function GameView(gameClient, options) {

  this._options = options || {};
  this._gameClient = gameClient;
  this._offset = {x: 50, y: 50};
  this._keepRendering = false;

  this._initRenderer();
  this._initGameListeners();
  
}

var p = GameView.prototype;

p.getView = function() {
  return this._renderer.view;
};

p._initRenderer = function() {

  this._renderer = new PIXI.CanvasRenderer(480, 360);
  var stage = this._stage = new PIXI.Stage();

  var layers = this._layers = {};

  layers.background = new PIXI.DisplayObjectContainer();
  layers.actors = new PIXI.DisplayObjectContainer();
  layers.effects = new PIXI.DisplayObjectContainer();

  this._updateBackground();
  this._updateOffset();

  stage.addChild(layers.background);
  stage.addChild(layers.actors);
  stage.addChild(layers.effects);

};

p._initGameListeners = function() {
  // TODO
};

p.startRendering = function() {
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

p._updateBackground = function() {

  var gameClient = this._gameClient;
  var layer = this._layers.background;
  //var
  //var gridSize =  gameClient.getGridSize();
  var gridSize =  {columns: 40, rows: 40};
  var cell;
  var tile;
  var xScale = this._options.xScale || 1;
  var yScale = this._options.yScale || 1;

  var i,j;
  for(i = 0; i < gridSize.columns; ++i) {
    for(j = 0; j < gridSize.rows; ++j) {
      //cell = gameClient.getCell(i, j);
      //tile = PIXI.Sprite.fromFrame(cell.getBackgroundFrameId());
      tile = PIXI.Sprite.fromImage('./assets/sprites/tiles/default.png');
      tile.position.x = i * 24 * xScale;
      tile.position.y = j * 24 * yScale;
      tile.scale.x = xScale;
      tile.scale.y = yScale;
      layer.addChild(tile);
    }
  }

};