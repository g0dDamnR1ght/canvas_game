document.addEventListener("DOMContentLoaded",  function(){
console.log(1); 
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("mousemove", mouseMoveHandler, false);

var canvas = document.getElementById('myCanvas'); 
var ctx = canvas.getContext('2d'); 
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10; 
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0; 

// создаем переменную кирпичи и показываем, что это массив

var bricks = []; 
for(var c = 0; c < brickColumnCount; c++){
		bricks[c] = [];
		for(var r = 0; r < brickRowCount; r++){
		bricks[c][r] = { x: 0, y: 0,  status: 1};
		}
	}	

// задаем, что бы по нажатию кнопки весло двигалось 
// начинает движение при нажатии на клавиши ф в


function keyDownHandler (){
	if (event.keyCode == 68) {
		rightPressed = true;  
	}
	if (event.keyCode == 65) {
		leftPressed = true;  
	}
}

// останавливает двидение при отпускании клавиш в ф 

function keyUpHandler (){
	if (event.keyCode == 68) {
		rightPressed = false; 
  
	}
	if (event.keyCode == 65) {
		leftPressed = false;
	}
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }

}

// функция обнаружения столкновенйи == A collision detection function

function collisionDetection (){
	for(var c = 0; c < brickColumnCount; c++){
		for(var r = 0; r < brickRowCount; r++){
			var b = bricks[c][r]; // подсчет 
			if(b.status == 1){
				if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
					dy = -dy; 
					b.status = 0; 
					score++; 
					if(score == brickColumnCount*brickRowCount){
						alert('You are Win!');
						document.location.reload(); 
						clearInterval(interval);  
					}
				}
			}
		}
	}
}

// отрисовываем мячик 

function drawBall(){
ctx.beginPath();
ctx.arc(x, y, ballRadius, 0, Math.PI*2,);
ctx.fillStyle = "lightblue";
ctx.fill();
ctx.closePath();
}

// создаем прямоугольник,  с которым будет сталкиваться мячик 

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "lightblue";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
	for(var c = 0; c < brickColumnCount; c++){
		for(var r = 0; r < brickRowCount; r++){
			if(bricks[c][r].status == 1){
			var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
			var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
			bricks[c][r].x = brickX; 
			bricks[c][r].y = brickY; 
			ctx.beginPath(); 
			ctx.rect(brickX, brickY, brickWidth, brickHeight); 
			ctx.fillStyle = "red"; 
			ctx.fill(); 
			ctx.closePath(); 
			}
		}
	}
}
 
function drawScore(){
	ctx.font = '30px freestyle script'; 
	ctx.fillStyle = 'black'; 
	ctx.fillText('Score: ' + score, 8, 20);
}

// двигаем то, что будет на экране 

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle(); 
    drawBricks(); 
    drawScore();
    collisionDetection();
      
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
   
      if(y + dy < ballRadius) {
        dy = -dy;
    }

   else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
    else{
    	alert('GAME OVER'); 
    	document.location.reload();
    	clearInterval(interval); //это нужно для рестарта!! вызываем clearInterval с переменной интервал 
   		}
   	}
	
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx; // x = x + dx; 
    y += dy;
}




// задаем интервал, с которым будет появляться мячик "setInterval(draw, 10);"

var interval = setInterval(draw, 10);


// clearInterval(interval); //это нужно для рестарта!! вызываем clearInterval с переменной интервал 


})
