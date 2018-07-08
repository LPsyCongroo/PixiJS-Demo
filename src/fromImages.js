import * as PIXI from 'pixi.js';

function importAll(r) {
  const images = r
    .keys()
    .map((item) => r(item))
    .sort((a, b) => {
      a = parseInt(a.match(/\d/g).join(''));
      b = parseInt(b.match(/\d/g).join(''));

      if(a < b)
        return -1;
      else
        return 1;
    });
  
  return images;
}

const images = importAll(require.context('./images/dead', false, /\.(png|jpe?g|svg)$/));


//Create a Pixi Application
const app = new PIXI.Application({
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

PIXI.loader
  .add(images)
  .on('progress', handleLoading)
  .load(setup);

const loading = document.createElement('h1');
loading.innerHTML = 'Loading...';
loading.classList += 'loading';

const loadbar = document.createElement('div');
loadbar.classList += 'loadbar';
document.body.appendChild(loadbar);

function handleLoading(loader, resource) {
  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url); 

  //Display the percentage of files currently loaded
  console.log("progress: " + loader.progress + "%"); 

  loadbar.style.width = `${loader.progress}%`;

  document.body.appendChild(loading);
}
  
function setup() {
  setTimeout(() => {
    document.body.removeChild(loading);
    
  }, 1000);  

  let sprite = new PIXI.Sprite(
    PIXI.loader.resources[images[0]].texture
  );

  // sprite.pivot.set(0.5, 0.5);
  sprite.position.set(0, 0);
  sprite.scale.x = 0.5;
  sprite.scale.y = 0.5;
  // sprite.anchor.set(0.5, 0.5);
  // sprite.rotation = 0.5;

  app.stage.addChild(sprite);

  function animate(sprite, textures){
    let index = 1;

    let intervalID = setInterval(() => {
      if(index === textures.length)
        // index = 0;
        return clearInterval(intervalID);
      
      sprite.texture = PIXI.utils.TextureCache[textures[index]];
      index += 1;
      
    }, 1000/15)    
  }

  const restart = document.createElement('button');
  restart.onclick = animate.bind(this, sprite, images);
  restart.innerHTML = 'Restart';
  restart.style.position = 'absolute';
  document.body.appendChild(restart);


  animate(sprite, images);
  // sprite.texture = PIXI.utils.TextureCache[images[10]];

}


