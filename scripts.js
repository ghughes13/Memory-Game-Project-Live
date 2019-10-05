const startBtn = document.querySelector('.start-btn');
const gameContainer = document.querySelector('.game-container');
const startScreen = document.querySelector('.start-screen');
const timer = document.querySelector('.timer p');
let score = 0;
let cardOne = '';
let cardTwo = '';

let gameCards = [];
let dogImgSrcs = [];


let level = 9;
let dogSrc = '';

startBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'flex';
    runTimer()
})

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
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function runTimer() {
    setInterval(function() {
        let newTimerNumber = timer.innerHTML;
        timer.innerHTML = newTimerNumber - 1;
        
        if(timer.innerHTML == 0) {
            endGame();
        }
        
        if(score == 9) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(runTimer);
    document.querySelector('.game-over').style.display = 'flex';
    document.querySelector('.game-over-text').innerHTML = "Game Over. You Scored " + score + " points. Play again?";
    console.log('stopped');
    startScreen.style.display = 'none';
    gameContainer.style.display = 'none';
}

const addClickLitenerToCards = () => {
    const indvGameCards = document.querySelectorAll('.game-card');
    indvGameCards.forEach((card) => {
        card.addEventListener('click', () => {
            card.classList.add('active');
            if(cardOne == '') {
                cardOne = card.getAttribute('data-key');
            } else if(cardOne != '') {
                if(cardOne == card.getAttribute('data-key')) {
                    score++;
                    console.log(cardOne);
                    document.querySelectorAll('.active').forEach((el) => {
                        el.classList.add('flip-perminent');
                    });
                    document.querySelector('.points p').innerHTML = score;
                    carOne = '';
                }

                document.querySelectorAll('.active').forEach((el) => {
                    window.setTimeout(function(){
                        el.classList.remove('active');
                    }, 1000); 
                });
            } 

        })
    });   
}

//Prevent user from clicking on same card twice

//check if 2 cards clicked are equal
    //if not flip cards back over
    //If they are; perminently flip them and add 1 to the score

//If score == 9 end the game

//Make game restart on click