const G = 9.8;
let i = 0;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

function drawAnimate() {
  if (typeof anim != "undefined"){
    clearInterval(anim);
    clearInterval(log);
    ctx.clearRect(0, 0, width, height);
    i=0;
    document.getElementById('log').value ="";
  }
  let x = parseInt(document.getElementById("posX").value);
  let y = parseInt(document.getElementById("posY").value);
  let radius = parseInt(document.getElementById("radius").value);
  let dx = parseInt(document.getElementById("dx").value);
  let dy = parseInt(document.getElementById("dy").value);
  let dt = parseInt(document.getElementById("dt").value);
  let t = parseFloat(document.getElementById("t").value)*1000;
  let k = parseFloat(document.getElementById("k").value);

  if ((x - radius) < 0 || ((2*radius) > width) || ((x+radius) > width)){
    alert("Невозможные координаты X или R");
    return;
  }
  if ((y - radius < 0) || ((2*radius) > height) || ((y+radius) > height)) {
      alert("Невозможные координаты Y или R");
    return;
  }
  if ((k <= 0) || (k > 1)){
    alert("K должен быть от (0 до 1]")
    return ;
  }
  //const my_G = (G/1000)*dt;
  let ball = new Ball(x, y, radius,dx,dy,k);
  let logX = ball.x;
  let logY = ball.y;
  //console.log(ball);
  log = setInterval(function() {
    //console.log("t"+i+": ("+logX+", "+logY+") -> ("+ball.x+", "+ball.y+")");
    document.getElementById('log').value += "t"+i+": ("+logX+", "+logY+") -> ("+ball.x+", "+ball.y+")"+"\n";
    logX=ball.x;
    logY=ball.y;
    i++;
  },dt);
  anim = setInterval(function() {
    //console.log(ball);
    ctx.clearRect(0, 0, width, height);
    ball.draw();
    ball.move();
    ball.checkCollision();
    ball.ySpeed+=(G/4);
    ctx.strokeRect(0, 0, width, height);
  }, 30);


  setTimeout(function() {
      clearInterval(anim);
      clearInterval(log);
      i=0;
  }, t);
  }

class Ball {
  constructor(x, y, radius,dx,dy,k) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xSpeed = dx;
    this.ySpeed = dy;
    this.k=k;
  }

  draw() {
    circle(this.x, this.y, this.radius, true);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  checkCollision() {
    if ((this.x - this.radius) < 0) {
      this.x=this.radius;
      this.xSpeed = -this.xSpeed;
      this.ySpeed*=this.k;
    }
    if ((this.x + this.radius) > width){
      this.x=width-this.radius;
      this.xSpeed = -this.xSpeed;
      this.ySpeed*=this.k;
    }
    if (this.y - this.radius < 0)  {
      this.y=this.radius;
      this.ySpeed = -this.ySpeed;
      this.ySpeed*=this.k;
    }
    if ((this.y + this.radius) > height){
      this.y=height-this.radius;
      this.ySpeed = -this.ySpeed;
      this.ySpeed*=this.k;
    }
  }



}

let circle = function(x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}
