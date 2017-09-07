//扇形
var box = document.getElementById('box');
var divs = box.getElementsByTagName('div');
var onoff = true;
setTimeout(open,300);
divs[divs.length-1].onclick = function() {
  if (onoff) {
    close();
  }else {
    open();
  }
  onoff = !onoff;
}
for (var i = 0; i < divs.length-1; i++) {
  divs[i].index = i;
  divs[i].onclick = function() {
    for (var i = 0; i < divs.length; i++) {
      if (i<this.index) {
        divs[i].style.transform="rotate("+(350-(i*17)+this.index*17-80+10)+"deg)";
      }else if (i>this.index) {
        divs[i].style.transform="rotate("+(350-(i*17)+this.index*17-80-10)+"deg)";
      }
    }
    divs[this.index].style.transform="rotate("+(350-(this.index*17)+this.index*17-80)+"deg)";
  }
}
function open() {//使扇形打开
  for (var i = 0; i < divs.length; i++) {
    divs[i].style.transform="rotate("+(350-(i*17))+"deg)";
  }
}

function close() {//使扇形合并
  for (var i = 0; i < divs.length; i++) {
    divs[i].style.transform="rotate(0deg)";
  }
}
//canvas气泡效果
var canvas = document.getElementById('canvas');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var context = canvas.getContext('2d');
var balls = [];
var colors=['#69D2E7','#A7DBD8','#E0E4CC','#F38630','#FA6900','#FF4E50','#F9D423'];
var timer = null;
//一个圆的数据
/*var ball = {
  x:x,
  y:,
  r:
  vx:,
  vy:,
  color:
}*/
//在canvas上画圆的函数
/*
角度转弧度：角度*π/180
*/
function draw(ball){
  context.beginPath();//开始的路径
  
  context.arc(ball.x,ball.y,ball.r,0,Math.PI*2);//画圆

  context.fillStyle = ball.color;//给圆填充颜色
  context.globalCompositeOperation = 'lighter';
  context.fill()//将圆放置于画布上
}
//取min到max之间的随机数
function random(min,max){
  return Math.round(Math.random()*(max-min)+min);
}

//鼠标移动触发事件
var on = true;
canvas.onmousemove = function(ev){
  ev = ev || event;
  //在移动时创建2个圆
  for (var i = 0; i < 2; i++) {
    var ball = {
      x:random(-5,5)+ev.clientX,
      y:random(-5,5)+ev.clientY+window.pageYOffset,
      r:random(10,45),
      vx:Math.random()-0.5,
      vy:Math.random()-0.5,
      color:colors[random(0,colors.length-1)]
    }
    balls.push(ball);
    if (balls.length>300) {
      balls.shift();
    }
  }
  
  //让定时器只开启一次
  if (on) {
    clearInterval(timer);
    timer = setInterval(drawBall,30);
    on = false;
  }
  
  function drawBall(){
    context.clearRect(0,0,canvas.width,canvas.height);
    for (var i = 0; i < balls.length; i++) {
      //需要在画的时候把球的位置，半径都改了
      //通过速度改变位置
      balls[i].x += balls[i].vx*8;
      balls[i].y += balls[i].vy*8;
      //乘以一个系数改变球的半径
      balls[i].r = balls[i].r*0.94;
      
      if (balls[i].r<1) {
        balls.splice(i,1);
        continue;
      }
        draw(balls[i]);
      
    }
    if (!balls.length) {
      clearInterval(timer);
      on = true;
    }
    //console.log(1);
  }
}