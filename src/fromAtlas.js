import * as PIXI from 'pixi.js';
const { Application, Container, loader, Sprite, utils, Rectangle } = PIXI;

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

// add Atlas to loader
loader
  .add('./images/atlas.json')
  .load(setup);

  
function setup() {

  // Method 1 

  // Create tileset sprite
  // const texture = utils.TextureCache["Dead (1).png"];

  // Create sprite from texture
  // const person = new Sprite(texture);

// Method 2

  // const person = new Sprite(
  //   loader
  //     .resources["./images/atlas.json"]
  //     .textures["Idle (1).png"]
  // );

// Method 3
  
  const spriteId = loader.resources["./images/atlas.json"].textures;
  const person = new Sprite(spriteId["Idle (4).png"]);

  app.stage.addChild(person);

  // Render the stage
  app.renderer.render(app.stage);

  // Center
  person.x = window.innerWidth / 2 - person.width / 2;  
  person.y = window.innerHeight / 2 - person.height / 2;

  app.ticker.add(delta => loop(delta));

  let width = window.innerWidth;

  const loop = delta => {
    person.x = (person.x + 2) % width;
  }

  let currFrame = 1;

  const animate = () => {
    currFrame = (currFrame % 8) + 1; 
    person.texture = utils.TextureCache[`Run (${currFrame}).png`];
  }
  setInterval(animate, 80);

}

