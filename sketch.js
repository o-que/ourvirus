// animation inspired by and modified from this reference code: https://p5js.org/examples/3d-sine-cosine-in-3d.html

// set variables for different screens to appear depending on user interaction

var IsPressing;
var firstPress;

// set variable for font to be preloaded and called later

var myFont;

function preload() {
  myFont = loadFont('Inconsolata-Light.ttf');
}

// setting starting screen

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  IsPressing = false;
}

function draw() {

  //   if user isn't holding the mouse a black background is drawn

  if (IsPressing == false) {
    background(0);
  }

  //   before the user clicks for the first time, display this screen with a single sphere rotating on all axes at the same rate

  if (!firstPress) {
    textSize(20);
    textFont(myFont);
    text('its still dormant. what will you do?', -100, 300);
    textAlign(CENTER, CENTER);
    fill(255);
    rotateY(frameCount * 0.01);
    rotateZ(frameCount * 0.01);
    rotateX(frameCount * 0.01);
    push();
    //     fill and stroke are at different opacity levels in order to produce optical effects

    fill('rgba(0,255,0, 0.25)');
    stroke('rgba(0,255,0, 0.025)');
    strokeWeight(50);
    sphere(100, 15, 4);
    pop();
  }

  //   if user clicks the screen change animation to multiple shifting spheres created from for loop - moving and rotating at different rates and angles/sin curves along X, Y, Z axes

  if (firstPress) {

    rotateY(frameCount * 0.025);

    for (let j = 0; j < 5; j++) {
      push();
      for (let i = 0; i < 80; i++) {
        translate(
          sin(frameCount * 0.001 + j) * 1000,
          sin(frameCount * 0.001 + j) * 100,
          i * 0.1
        );
        rotateZ(frameCount * 0.002);
        rotateY(frameCount * 0.05);
        push();
        fill('rgba(0,255,0, 0.25)');
        stroke('rgba(0,255,0, 0.025)');
        strokeWeight(2);
        sphere(15, 15, 4);
        pop();
      }
      pop();
    }

    //     display text that says 'virus' - rotates on X axis
    textSize(200);
    textFont(myFont);
    text('virus', 0, 0);
    //   display rotating asterisk on top of the center of the word 'virus' - gets drawn over by new spheres that move in front of it
    textSize(300);
    text('*', 0, 0);
    textAlign(CENTER, CENTER);
    fill(0);
  }

}

// if mouse is held down clear the screen and change background - draws trail of every sphere on screen as well as the word 'virus'

function mousePressed() {
  if (!firstPress) {
    firstPress = true;

  }

  IsPressing = true;

  clear();
  background(100);

}

// if mouse is released draw black background over the last screen and restart animation - no trails

function mouseReleased() {

  IsPressing = false;

  background(0);
}
