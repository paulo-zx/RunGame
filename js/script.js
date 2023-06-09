const char = document.querySelector('.char');
const pipe = document.querySelector('.pipe');


const TminutesEl = document.querySelector('#Tminutes');
const minutesEl = document.querySelector('#minutes');
const secondsEl = document.querySelector('#seconds');
const milisecondsEl = document.querySelector('#miliseconds');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');

const gameover = document.querySelector('#gameover');
const startgame = document.querySelector('#start-game');
const intro = document.querySelector('#intro');



let Tminutes=0;
let minutes=0;
let seconds=0;
let miliseconds=0;

let interval;

let isPaused = false;

let tempo=0;



startBtn.addEventListener("click",startTimer);
resetBtn.addEventListener("click",resetTimer);


function startTimer(){
    gamestart();
    interval = setInterval(()=>{

        tradeback();
        
         
        if(!isPaused){
            miliseconds +=10;

            if(miliseconds ===1000){
                seconds++;
                miliseconds=0;
            }

            if(seconds===60){
                minutes++;
                seconds=0;
            }

            if(minutes===60){
                Tminutes++;
                minutes=0;
            }

            TminutesEl.textContent = formatTime(Tminutes);
            minutesEl.textContent = formatTime(minutes);
            secondsEl.textContent = formatTime(seconds);
            milisecondsEl.textContent = formatTimeMili(miliseconds);
        }

    },10)
}

function resetTimer(){
    clearInterval(interval);
    Tminutes=0;
    minutes = 0;
    seconds = 0;
    miliseconds=0;

    TminutesEl.textContent = "00"
    minutesEl.textContent = "00"
    secondsEl.textContent="00"
    milisecondsEl.textContent="000"

    isPaused =false
    restart();
    
    
}

function formatTime(time) {
    return time < 10 ? `0${time}` :time;
}

function formatTimeMili(time) {
    return time < 100 ? `${time}`.padStart(3,"0") :time;
}

const jump = () => {
    char.classList.add('jump');

    setTimeout(()=>{
        char.classList.remove('jump');
    },500);
}



const loop = setInterval(()=>{

    const pipePosition = pipe.offsetLeft;
    const charPosition = +window.getComputedStyle(char).bottom.replace('px','');

    if(pipePosition <= 120 && pipePosition > 0 && charPosition <80){
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        char.style.animation = 'none';
        char.style.bottom = `${charPosition}px`;

        char.src = './images/tao-twirl3.gif';
        char.style.width = '175px'
        char.style.marginLeft = '0.01px'
        isPaused =true
        endgame();

        clearInterval(loop);
    }

},10);


function endgame(){
    gameover.style.display = "block";
}

function gamestart(){
    startgame.style.display = "block";
    intro.style.display = "none";
}

function restart(){
    window.location.reload(true);
}



const background = document.querySelector('.game-board');

let tc=0;



function tradeback(){ 
    //50000=8minuts
    tc++;  
    if(tc===20000){
        background.classList.toggle('after'); 
    } 

    
     
    if(tc===30000){
       background.classList.toggle('night');
       tc=0;
    }   
}
   





//controle

document.addEventListener('keydown',jump);
document.addEventListener('touchstart',jump);
