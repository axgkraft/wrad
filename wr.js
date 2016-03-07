//code from p5.js     http://p5js.org/reference/#/p5.FFT
var x; // horizontal plotting position
var diam = 8; // How big our "note heads" will be

function preload(){
  sound = loadSound('assets/analysisdmaiff.mp3')
}
function setup(){
  //original canvas size: 600 X 450
  cnv = createCanvas(800,600);
  sound.amp(0);
  sound.loop();
  fft = new p5.FFT();
}

function draw(){
  background(0);

  var spectrum = fft.analyze();
  noStroke();
  //fill(0,255+random(-100,100),255+random(-50,50)); // spectrum is blue
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width*4); //expand a bit in order to see clearer
    fill(0+x/6,115+x/3,255);
    //fill(0,155+x/6,255-x/6);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    //rect(x, height, width / spectrum.length, h );
    ellipse(x, h+height, random(-diam,diam), random(-diam,diam));
  }

//  fill(200,200,200); //make text white
  //text("Xanthe Kraft  \nWHITE RADIANCE  \nMusic 27", 1000, 25, 1050, 60);

  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(50,0,100); // waveform is red
  strokeWeight(4);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height/3);
    vertex(x,y);
  }
  endShape();

//  var dp = p - prevp;  // use pitch 'backward difference' as a parameter (rate of change)
//  fill(((p-middleC)/48+x/width-random(-jitterC,jitterC))/2,1,1);  // color by avg pitch + time
  //rect(x,height/2-(p-middleC)*sfY*2, dp*sfX+random(-jitterX,jitterX), dp*sfY+random(-jitterY,jitterY))
///  fill(((p-middleC)/128+x/width-random(-jitterC,jitterC))/2,1,1);  // color by pitch offset by 1/2
//  ellipse(x, height/2-(p-middleC)*sfY*2, random(-diam,diam), random(-diam,diam));
//  synthesize(); // Make sound
//  update(); // update position and pitch variables

  isMouseOverCanvas();
}

// fade sound if mouse is over canvas
function isMouseOverCanvas() {
  var mX = mouseX, mY = mouseY;
  if (mX > 0 && mX < width && mY < height && mY > 0) {
      sound.amp(0.5, 0.2);
  } else {
    sound.amp(0, 0.2);
  }
}
