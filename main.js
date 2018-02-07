const G = 9.8;
let i = 0;

let canvas = document.getElementById("canvas");
let canvas1 = document.getElementById("graphik");
let ctx1 = canvas1.getContext("2d");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let width1 = canvas1.width;
let height1 = canvas1.height;

function drawAnimate() {
  if (typeof anim != "undefined"){
    clearInterval(anim);
    clearInterval(log);
    ctx.clearRect(0, 0, width, height);
    i=0;
    document.getElementById('log').value ="";
    document.getElementById('log2').value ="";
	ctx1.clearRect(0, 0, width1, height1);
  }
  let x = parseInt(document.getElementById("posX").value);
  let y = parseInt(document.getElementById("posY").value);
  let radius = parseInt(document.getElementById("radius").value);
  let dx = parseInt(document.getElementById("dx").value);
  let dy = parseInt(document.getElementById("dy").value);
  let dt = parseInt(document.getElementById("dt").value);
  let t = parseFloat(document.getElementById("t").value)*1000;
  let k = parseFloat(document.getElementById("k").value);
  let color = document.getElementById("color").value;

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
  let ball = new Ball(x, y, radius,dx,dy,k,color);
  let logX = ball.x;
  let logY = ball.y;
  ctx1.beginPath();
  //ctx1.moveTo(0, height1-logY*2);
  ctx1.strokeRect(0, 0, width1, height1);
  log = setInterval(function() {
	let ballHeight = height-ball.y-ball.radius;
	ctx1.stroke();
    document.getElementById('log').value += "t"+i+": ("+logX+", "+logY+") -> ("+ball.x+", "+ball.y+")"+"\n";
    document.getElementById('log2').value += "Высота:"+(ballHeight)+"; скорость: "+Math.sqrt(Math.pow(ball.xSpeed,2)+Math.pow(ball.ySpeed,2))+"\n";
    logX=ball.x;
    logY=ball.y;
	console.log(""+logX/2+ "; " + (height1-(ballHeight/2)));
    ctx1.lineTo(logX/2,height1-(ballHeight/2));
    i++;
  },dt);
  anim = setInterval(function() {
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
  constructor(x, y, radius,dx,dy,k,color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xSpeed = dx;
    this.ySpeed = dy;
    this.k=k;
    this.color=color;
  }

  draw() {
    circle(this.x, this.y, this.radius, true,this.color);
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
      this.xSpeed*=0.5;
    }
    if ((this.x + this.radius) > width){
      this.x=width-this.radius;
      this.xSpeed = -this.xSpeed;
      this.ySpeed*=this.k;
      this.xSpeed*=0.5;
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

let circle = function(x, y, radius, fillCircle, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.fillStyle = color;
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}
