import * as PIXI from 'pixi.js';
const { Application, loader, Sprite, utils, Rectangle } = PIXI;

import tileset from './images/tileset.png';

//Create a Pixi Application
const app = new Application({
  width: window.innerWidth,     // default: 800
  height: window.innerHeight,   // default: 600
  antialias: true,              // default: false
  transparent: false,           // default: false
  resolution: 1                 // default: 1
});

app.view.style.position = 'absolute';
app.view.style.display = 'block';

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);


loader
  .add(tileset)
  .load(setup);

  
function setup() {
  // Create tileset sprite
  const texture = utils.TextureCache[tileset];

  // Define position and size of sub image
  const rectangle = new Rectangle(192, 128, 64, 64);

  // Tell texture to use the rectangle defined section
  texture.frame = rectangle;

  // Create sprite from texture
  const rocket = new Sprite(texture);

  rocket.x = 32;
  rocket.y = 32;

  // Add the rocket to the stage
  app.stage.addChild(rocket);

  // Render the stage
  app.renderer.render(app.stage);
}

