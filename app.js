// const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.hit1');
const timeLeft = document.querySelector('#time-left');
const grid = document.querySelector('.grid');
const gridSelector =  document.querySelector('#grid-size');
let score = document.querySelector('#score');


let result = 0;
let currentPosition = null;
let currentTime = null;
let intervalRef = null;
let counterRef = null;
let square = [];
let hitImages = ['hit1', 'hit2', 'hit3', 'hit4', 'hit5', 'hit6'];
let hitImage = null;
let gridSize = null;

function createGame(){
  // get random hit image
  hitImage = hitImages[Math.floor(Math.random() * 6)]; 

  clearInterval(counterRef);
  clearInterval(intervalRef);  

  // create the game grid
  grid.innerHTML = "";
  timeLeft.textContent = 60;
  score.textContent = 0;
  result = 0;
  currentTime = timeLeft.textContent;

  gridSize = gridSelector.value;
  square = [];
  grid.innerHTML = "";
  grid.style.width = gridSize*100 + gridSize*1 + 'px';
  grid.style.height = gridSize*100 + gridSize*1 + 'px';
  
  let size = gridSize * gridSize;
  for(let i = 0; i < size; i++){
    let sqr = document.createElement('div');
    sqr.classList.add('square');
    sqr.id = i;
    square.push(sqr)
    grid.appendChild(sqr);
  }

  // add "Click" listener to all squares
  square.forEach(sqr => sqr.addEventListener('mouseup', () => {
    if(sqr.id == currentPosition){
      result = result + 1;
      score.textContent = result;
    }
  }));

  // move the hit in random positions
  intervalRef = setInterval(randomSquare, 1000);

  // run the counter
  counterRef = setInterval(countDown, 1000);

  generate();
}

function randomSquare(){
  square.forEach(sqr => {
    sqr.classList.remove(hitImage);
  });

  let randomSquarePosition = square[Math.floor(Math.random() * gridSize * gridSize)];
  randomSquarePosition.classList.add(hitImage);
  
  currentPosition = randomSquarePosition.id;
}



function moveHit(){
  
}



function countDown(){
  currentTime--;
  timeLeft.textContent = currentTime;

  if(currentTime === 0){
    
    clearInterval(counterRef);
    clearInterval(intervalRef);
    alert('GAME OVER! Your final score is '+ result);
  }
}



document.querySelector('#start-game').addEventListener('click', createGame);

// random background
function generate() {

  var hexValues = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e"];
  
  function populate(a) {
    for ( var i = 0; i < 6; i++ ) {
      var x = Math.round( Math.random() * 14 );
      var y = hexValues[x];
      a += y;
    }
    return a;
  }
  
  var newColor1 = populate('#');
  var newColor2 = populate('#');
  var angle = Math.round( Math.random() * 360 );
  
  var gradient = "linear-gradient(" + angle + "deg, " + newColor1 + ", " + newColor2 + ")";
  
  grid.style.background = gradient;
  
}
