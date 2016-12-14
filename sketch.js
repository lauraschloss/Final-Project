//Collision detection - Bouncing behavior

var ball;
var bat;
var pbs = [];
var wallTop, wallBottom, wallLeft, wallRight;
var score = 0;

function setup() {
  createCanvas(800,400);  
  var x = (width/2);
  var y = (height/2);
  
  
  ball = {};
  ball.x = random(width);
  ball.y = random(height);
  ball.d = 20;
  ball.v = 0;
  ball.a = 0;
  
  
  bat = {};
  bat.x = width/2;
  bat.y = height/2;
  bat.w = 10;
  bat.h = 100;
  
  for(var i=0; i<10; i++)
  {
    var pb = {};
    pb.shoulddisplay = true;
    pb.x = random(width);
    pb.y = random(height);
    pb.d = 20;
    pb.v = 0;
    pb.a = 0;
    pbs.push(pb);
  }
  
}

function draw() {
  background(255,255,255);  
  fill(0);
  
  bat.x = mouseX;
  bat.y = mouseY;
  
  if (bat.x > 400 && bat.y > 400) {
    fill(0,0,0);
  }

  if(ball.x>bat.x-bat.w/2&&ball.x<bat.x+bat.w/2&&ball.y>bat.y-bat.h/2&&ball.y<bat.y+bat.h/2)
  {
    console.log("hitting");
    var d = dist(ball.x, ball.y, bat.x, bat.y);
    ball.v+=dist(pmouseX, pmouseY, mouseX, mouseY);
    ball.a = atan2(ball.y-bat.y, ball.x-bat.x);
    //console.log(ball.a);
    
  }
  
  fill(0);
  
  ellipse(ball.x, ball.y, ball.d, ball.d);
  
  var a;
  if(mouseX<width/2 && mouseY<height/2) a = 125;
  if(mouseX>=width/2 && mouseY<height/2) a = 95;
  if(mouseX<width/2 && mouseY>=height/2) a = 155;
  if(mouseX>=width/2 && mouseY>=height/2) a = 200;
  translate(bat.x, bat.y);
  rotate(a);
  rect(-bat.w/2, -bat.h/2, bat.w, bat.h);
  resetMatrix(); // make everything normal
  ellipse(bat.x, bat.y, bat.w*2, bat.w*2); //Point where it hits black

  ball.x+=ball.v*cos(ball.a);
  ball.y+=ball.v*sin(ball.a);
  ball.v*=0.99; // damping
  
  textSize(32);
  text("score:" + score, 10, 30);
  fill(0, 102, 153);


  if(ball.x> width) ball.a = PI - ball.a;
  if(ball.y> height) ball.a = TWO_PI - ball.a;
  if(ball.x< 0) ball.a = PI - ball.a;
  if(ball.y< 0) ball.a = TWO_PI - ball.a;



  fill(255, 0, 0);
  for(var i =  0;i<pbs.length;i++)
  {
    if (pbs[i].shoulddisplay == true) {
      
      ellipse(pbs[i].x, pbs[i].y, pbs[i].d, pbs[i].d);
      if(ball.x>pbs[i].x-pbs[i].d/2&&ball.x<pbs[i].x+pbs[i].d/2&&ball.y>pbs[i].y-pbs[i].d/2&&ball.y<pbs[i].y+pbs[i].d/2)
    {
        pbs[i].v+=ball.v;
        pbs[i].a = atan2(pbs[i].y-ball.y, pbs[i].x-ball.x);
      
    }
    }

    for(var j = 0;j<pbs.length;j++)
    {
      if(j!=i) {
        if(pbs[j].x>pbs[i].x-pbs[i].d/2&&pbs[j].x<pbs[i].x+pbs[i].d/2&&pbs[j].y>pbs[i].y-pbs[i].d/2&&pbs[j].y<pbs[i].y+pbs[i].d/2)
        {
          pbs[i].v+=pbs[j].v/2;
          pbs[i].a = atan2(pbs[i].y-pbs[j].y, pbs[i].x-pbs[j].x);
          
        }
      }

    }
    if(pbs[i].v>20) pbs[i].v = 20;



      pbs[i].x+=pbs[i].v*cos(pbs[i].a);
      pbs[i].y+=pbs[i].v*sin(pbs[i].a);
      pbs[i].v*=0.99; // damping
      
      //Make each small ball collide with one another

  if((pbs[i]).x>=width-20 && pbs[i].y<=20 && pbs[i].shoulddisplay) {
    pbs[i].shoulddisplay = false;
    score = score + 1;
  }
  if((pbs[i]).x>=width-20 && pbs[i].y>=height-20 && pbs[i].shoulddisplay) {
    pbs[i].shoulddisplay = false;
    score = score + 1;
  }
  if((pbs[i]).x<=20 && pbs[i].y>=height-20 && pbs[i].shoulddisplay) {
    pbs[i].shoulddisplay = false;
    score = score + 1;
  }
  if((pbs[i]).x<=20 && pbs[i].y<=20 && pbs[i].shoulddisplay) {
    pbs[i].shoulddisplay = false;
    score = score + 1;
  }
  
  }
  
  
  if(pbs[i].x> width) pbs[i].a = PI - pbs[i].a;
  if(pbs[i].y> height) pbs[i].a = TWO_PI - pbs[i].a;
  if(pbs[i].x< 0) pbs[i].a = PI - pbs[i].a;
  if(pbs[i].y< 0) pbs[i].a = TWO_PI - pbs[i].a;

  }

  



  
}
