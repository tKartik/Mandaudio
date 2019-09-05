let mic, soundFile;
let amplitude;
let randColor;
let myFont;
let amp;
let mapMax = 1;
let sensitivity = 3;
let time = 0;
let rad,
  c,
  val = 0;
let hide = true;
let firstShow = true; //

function preload() {
  myFont = loadFont("./assets/Josefin.ttf");
}

function mouseClicked() {
  if (windowWidth > 1000) {
    rad = random(100, 600);
  } else {
    rad = random(windowWidth / 4, windowHeight / 3);
  }

  getAudioContext().resume();
  firstShow = false;
  if (windowWidth < 1000) {
    if (val < 3) {
      val++;
    }
    if (val == 3) {
      val = 0;
    }
    firstShow = false;
  }
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
  if (windowWidth > 1000) {
    randColor = map(level, 0, mapMax, 0, amp);
  } else {
    randColor = map(level, 0, mapMax, -30, 255);
  } // console.log(randColor);

  let m = map(mouseX, 0, windowWidth, 15, 6);
  let lol = map(mouseX, 0, windowWidth, 1, 60);
  let gol = map(mouseY, 0, windowHeight, -1, 1);

  //Mobile friendly instructions
  textAlign(CENTER);
  if (windowWidth > 1000) {
    if (firstShow) {
      fill(220, 100);
      rect(10, 10, windowWidth - 20, windowHeight - 20);
      textSize(50);
      fill(20);
      text("Click anywhere to start", windowWidth / 2, windowHeight / 2 + 70);
      textSize(30);
      text(
        "This is an interactive Mandala Simulation, please allow\n the browser to access your mic. \n If you don't see any significant variation in colors, try changing the sensitivity. ",
        windowWidth / 2,
        windowHeight / 2 - 70
      );
    }
  } else {
    if (firstShow) {
      fill(220, 100);
      rect(10, 10, windowWidth - 20, windowHeight - 20);
      fill(30);
      textSize(20);
      text("Tap anywhere to start", windowWidth / 2, windowHeight / 2 + 90);
      textSize(15);
      text(
        "Use it on your laptop for better experience",
        windowWidth / 2,
        windowHeight / 2 + 110
      );
      textSize(16);
      text(
        "Instructions - \n This is an interactive Mandala \nSimulation, please allow the browser \nto access your mic. \n -Tap to change the\n color of Mandalas\n -Drag your finger around to \nchange radius & speed of mandala ",
        windowWidth / 2,
        windowHeight / 2 - 100
      );
    }
  }

  if (windowWidth > 1000) {
    textAlign(LEFT);
    textSize(18);
    if (hide) {
      fill(220, 10);
      rect(windowWidth - 410, 25, 388, 175);
      fill(220);
      text(
        "Instructions - \n -Press Up Arrow to change sensitivity of your mic \n -Press Space to change color theme \n -Mouse Click for a new Mandala \n -Move around your mouse ;) \n -Press 'i' to hide/show instructions \n Press F11 and then F5 to enter full screen mode",
        windowWidth - 400,
        50
      );
    }
  }

  textSize(12);
  fill(220);
  if (windowWidth > 1000) {
    text("Created with <3 by Kartik", windowWidth - 160, windowHeight - 10);
  } else {
    fill(220, 40);
    textAlign(CENTER);
    text("Created with <3 by Kartik", windowWidth / 2, windowHeight - 10);
  }

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
  if (windowWidth > 1000) {
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
  } else {
    amp = 255; //for mobile only one
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
