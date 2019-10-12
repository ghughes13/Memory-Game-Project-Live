const startBtn = document.querySelector('.start-btn');
const restartBtn = document.querySelector('.restart-btn');
const gameContainer = document.querySelector('.game-container');
const startScreen = document.querySelector('.start-screen');
const restartContainer = document.querySelector('.game-over');
const timer = document.querySelector('.timer p');
let gameTimer;

let score = 0;
let level = 9;
let dogSrc = '';

let gameCards = [];
let dogImgSrcs = [];

const startGame = () => {
    document.querySelectorAll('.flip-perminent').forEach((el) => {
        el.classList.remove('.flip-perminent')
    });
    timer.innerHTML = 50000;
    score = 0;
    startScreen.style.display = 'none';
    restartContainer.style.display = 'none';
    gameContainer.style.display = 'flex';
    gameTimer = setInterval(runTimer, 1000);
}

$.ajax({
    url : 'https://dog.ceo/api/breeds/image/random/' + level,
    type : 'GET',
    dataType:'json',
    success : function(data) {              
        dogSrc = data.message;
        console.log(dogSrc);
        setUpGameCards();
    },
    error : function(request,error)
    {
        alert("Request: "+JSON.stringify(request));
    }
});

const setUpGameCards = () => {
    for(let i = 0; i < level; i++) {
        card = (
        `<div class='game-card' data-key="item-${i}">
            <div class="front"></div>
            <div class="back">
                <img src="${dogSrc[i]}" class="back-img">
            </div>
        </div>`);
        gameCards.push(card);
        gameCards.push(card);
    }

    gameContainer.innerHTML = shuffle(gameCards).join('');

    addClickLitenerToCards()
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function runTimer() {
    let newTimerNumber = timer.innerHTML;
    timer.innerHTML = newTimerNumber - 1;
    
    if(timer.innerHTML == 0) {
        clearInterval(gameTimer);
        endGame();
    }
    
    if(score == 9) {
        clearInterval(gameTimer);
        endGame();
    }
}

function endGame() {
    document.querySelector('.game-over').style.display = 'flex';
    document.querySelector('.game-over-text').innerHTML = "Game Over. You Scored " + score + " points. Play again?";
    console.log('stopped');
    startScreen.style.display = 'none';
    gameContainer.style.display = 'none';
}

function addClickLitenerToCards() {  
    const indvGameCards = document.querySelectorAll('.game-card');
    indvGameCards.forEach(function(card) {
        card.addEventListener('click', function() {
            card.classList.add('active');
            let activeNumber = document.querySelectorAll('.active');
            if(activeNumber.length == 2) {
                console.log(activeNumber[0])
                if(activeNumber[0].getAttribute('data-key') == activeNumber[1].getAttribute('data-key')) {
                    score++;
                    activeNumber.forEach(function(el) {
                        el.classList.add('flip-perminent');
                    });
                    document.querySelector('.points p').innerHTML = score;
                }

                document.querySelectorAll('.active').forEach(function(el) {
                    window.setTimeout(function(){
                        el.classList.remove('active');
                    }, 1000); 
                });
            } 
        })
    });   
}


startBtn.addEventListener('click', startGame)
restartBtn.addEventListener('click',startGame)
//Make game restart on click
//Make Timer Stop