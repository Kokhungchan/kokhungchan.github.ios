var canvas, stage, exportRoot;
var w = 1280;
var h = 720;
var helloW = 927;
var helloH = 275;
function init() {

  canvas = document.getElementById("canvas");
  exportRoot = new lib.Text2();

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  stage = new createjs.Stage(canvas);
  createjs.Touch.enable(stage);
  stage.addChild(exportRoot);
  stage.update();

  hello = exportRoot.hello;

  stage.on("stagemousedown", handleClick, this);

  container = new createjs.Container();
  exportRoot.addChild(container);

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.on("tick", onTick);

  handleResize();
  window.addEventListener("resize", handleResize);

  createjs.Tween.get(this).wait(getRange(500, 1000)|0).call(function () {
    handleClick()
  })
  
}

function handleClick() {
  container.removeAllChildren();
  createjs.Tween.removeAllTweens();

  mapClip(hello.letter1, getRange(190, 320)| 0, {width:181, height:266});
  mapClip(hello.letter2, getRange(190, 320)| 0, {width:161, height:266});
  mapClip(hello.letter3, getRange(190, 320)| 0, {width:155, height:266});
  mapClip(hello.letter4, getRange(190, 320)| 0, {width:155, height:266});
  mapClip(hello.letter5, getRange(190, 320)| 0, {width:190, height:275});
}

function handleResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  scale = Math.min(canvas.width, canvas.height)/720;

  exportRoot.scaleX = exportRoot.scaleY = scale;
  exportRoot.regX = 1024/2;
  exportRoot.regY = 600/2;
  exportRoot.x = canvas.width>>1;
  exportRoot.y = canvas.height>>1;
  stage.update(lastEvent);
}

function mapClip(clip, total, area) {
  var ball = getSprite(10);
  for(var i=0;i<total;i++) {
    var pt = clip.localToGlobal(0, 0);
    var pt1 = exportRoot.globalToLocal(pt.x, pt.y);
    var _x = Math.random()*area.width | 0;
    var _y = Math.random()*area.height | 0;
    if (clip.hitTest(_x, _y)) {
      var _ball = ball.clone();
      var scale = getRange(0.8,1.15);
      _ball.x = pt1.x+(_x*hello.scaleX);
      _ball.y = pt1.y+(_y*hello.scaleX);
      _ball.scaleX = _ball.scaleY = 0;
      createjs.Tween.get(_ball).wait((i+1)*30).to({scaleX:scale, scaleY:scale}, 200 + Math.random()*200 | 0, createjs.Ease.backOut);
      container.addChild(_ball)
    }
  }
}

function getRange(min, max) {
  var scale = max - min;
  return Math.random()*scale + min;
}

function getSprite(r) {
  var s = new createjs.Shape();
  s.graphics.s("#000000").ss(2*scale, 0, 0, 0, true).f("#ffffff").dc(0,0,r).s("#000000").ss(2*scale, 0, 0, 0, true).f("#ffffff").dc(0,0,r/2);
  s.cache(-r/2, -r/2, r, r);
  return s;
}

var lastEvent;
function onTick(event) {
  lastEvent = event;
  stage.update(event);
}

init();
  