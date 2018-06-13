const iconsLi = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
const deckContainer = document.querySelector(".deck");
let openCards = [];
let matching = [];
const restrtBtn = document.querySelector(".restart");
const movesContainer = document.querySelector(".moves");
const starContainer = document.querySelector(".stars");
const icons = shuffle(iconsLi);
let firstClick = true;

//Make cards
function init() {
    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        deckContainer.appendChild(card);
        //flip cards
        card.addEventListener("click", function() {
            if (firstClick) {
                startTimer();
                firstClick = false;
            }
            if (openCards.length === 1) {
                openCards.push(card);
                card.classList.add("open", "show", "disable");
                //start time
                //add moves
                addMove();
                //compare cards
                //matching
                if (card.innerHTML === openCards[0].innerHTML) {
                    console.log("match");
                    card.classList.add("match");
                    openCards[0].classList.add("match");
                    matching.push(card, openCards[0])
                    openCards = [];
                    //check if game is over
                    gameOver();
                    //not matching    
                } else {
                    setTimeout(function() {
                        console.log("no match");
                        card.classList.remove("open", "show", "disable");
                        openCards[0].classList.remove("open", "show", "disable");
                        openCards = [];
                    }, 600);
                }
            } else {
                openCards.push(card);
                card.classList.add("open", "show", "disable");
            }
        });
    }
}

function gameOver() {
    if (matching.length === icons.length) {
        stopTimer();
        document.getElementById("winBox").style.display = "flex";
        document.getElementById("finalTime").textContent = document.querySelector(".time").innerHTML;
        document.getElementById("finalRating").innerHTML = document.querySelector(".stars").innerHTML;
        document.getElementById("finalMoves").textContent = document.querySelector(".moves").innerHTML + " moves";
    }
}
//moves
let moves = 0;
movesContainer.innerHTML = 0;

function addMove() {
    moves++;
    movesContainer.innerHTML = moves;
    starRate();
}
//stars
function starRate() {
    if (moves > 12) {
        starContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>`;
        if (moves > 22) {
            starContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
        }
    }
}
//timer
let sec = 0;
let min = 0;
let timer;
//start timer function
function startTimer() {
    timer = setInterval(insertTime, 1000);
}

function stopTimer() {
    clearInterval(timer);
    sec = 0;
    min = 0;
}

function insertTime() {
    sec++;
    if (sec < 10) {
        sec = `0${sec}`;
    }
    if (sec >= 60) {
        min++;
        sec = "00";
    }
    document.querySelector(".time").innerHTML = "0" + min + ":" + sec;
}
//stop timer function
restrtBtn.addEventListener("click", function() {
    //empty container
    deckContainer.innerHTML = [];
    //initialize game
    init();
    //reset 
    matching = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
    stopTimer();
    startTimer();
    firstClick = true;
});
//call init to initialize the game
init();

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function playAgain() {
    document.getElementById("winBox").style.display = "none";
    deckContainer.innerHTML = [];
    init();
    matching = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
    stopTimer();
    startTimer();
}