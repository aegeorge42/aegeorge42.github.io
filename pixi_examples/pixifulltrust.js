//var width = $("#main").clientWidth;
//	var height = $("#main").clientHeight;
//	var x = -(width-960)/2;
//	var y = -(height-540)/2;

const app = new PIXI.Application({
  //autoResize: true,
  width: $("#main").clientWidth
  height: $("#main").clientHeight
  x: -(width-960)/2;
  y: -(height-540)/2;
  resolution: devicePixelRatio 
  backgroundColor: 0xcccccc
});
document.body.appendChild(app.view);