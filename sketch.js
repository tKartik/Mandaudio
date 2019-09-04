let mic, soundFile;
let amplitude;
let myFont;
let amp;
let mapMax = 1;
let sensitivity = 1;
let time = 0;
let rad,
  c,
  val = 0;
let hide = true;

function preload() {
  myFont = loadFont("./assets/Josefin.ttf");
}

function mouseClicked() {
  rad = random(100, 600);
}

function keyPressed() {
  if (keyCode === 32) {
    if (val < 3) {
      val++;
    }
    if (val == 3) {
      val = 0;
    }
    // console.log(val);
  }
  if (keyCode === UP_ARROW) {
    if (sensitivity < 5) {
      sensitivity++;
    }
    if (sensitivity == 5) {
      sensitivity = 1;
    }
  }
  if (keyCode === 73) {
    hide = !hide;
    // console.log(hide);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rad = random(100, 600);

  mic = new p5.AudioIn();
  mic.start();

  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);
}

function draw() {
  background(20, 50);

  let level = amplitude.getLevel();
  let randColor = map(level, 0, mapMax, 0, amp);
  // console.log(randColor);

  let m = map(mouseX, 0, windowWidth, 15, 6);
  let lol = map(mouseX, 0, windowWidth, 1, 60);
  let gol = map(mouseY, 0, windowHeight, -1, 1);

  textSize(18);
  if (hide) {
    fill(220, 10);
    rect(windowWidth - 410, 25, 388, 150);
    fill(220);
    text(
      "Instructions - \n -Press Up Arrow to change sensitivity of your mic \n -Press Space to change color theme \n -Left CLick on your mouse for a new Mandala \n -Move around your mouse ;) \n -Press 'i' to hide/show instructions",
      windowWidth - 400,
      50
    );
  }

  textSize(12);
  fill(220);
  text("Created with <3 by Kartik", windowWidth - 160, windowHeight - 10);

  // To change background color
  if (val == 0) {
    c = color(randColor, 120, 250, 50);
  }
  if (val == 1) {
    c = color(20, randColor, 100, 50);
  }
  if (val == 2) {
    c = color(255, 70, randColor * 1.5, 50);
  }

  //to change sensitivity
  fill(220);
  textFont(myFont);
  if (sensitivity == 1) {
    amp = 255;
    textSize(18);
    text("Sensitivity: Low", 35, 35);
  }
  if (sensitivity == 2) {
    amp = 900;
    textSize(18);
    text("Sensitivity: Medium", 35, 35);
  }
  if (sensitivity == 3) {
    amp = 1800;
    textSize(18);
    text("Sensitivity: High", 35, 35);
  }
  if (sensitivity == 4) {
    amp = 3500;
    textSize(18);
    text("Sensitivity: Very High", 35, 35);
  }

  angleMode(DEGREES);
  translate(windowWidth / 2, windowHeight / 2);
  noFill();
  stroke(c);
  strokeWeight(0.2);
  rotate(time);

  for (i = 0; i < 540; i = i + m) {
    push();
    translate(rad * cos(i), rad * sin(i));
    rotate(i - 90);
    arc(0, 0, rad + lol, rad + lol - level * 200, 0, 2 * 180, OPEN);
    arc(0, 0, rad + lol, rad - lol + level * 200, 0, 2 * 180, OPEN);
    arc(0, 0, rad - lol, rad + lol - mouseY * 2, 0, 2 * 180, OPEN);
    arc(0, 0, rad - m, rad + lol * 2, 0, 2 * 180, OPEN);
    arc(0, 0, rad + lol, rad * 2, 0, 2 * 180, OPEN);
    arc(0, 0, rad * 2, rad * 2, 270, 0, OPEN);
    pop();
  }
  time = time + gol;
  // console.log(mouseX)
}
