/*
 * List for all the cards
 */
const icons = ["fa fa-android", "fa fa-bomb", "fa fa-apple", "fa fa-css3", "fa fa-diamond", "fa fa-windows", "fa fa-bolt", "fa fa-qq", "fa fa-android", "fa fa-bomb", "fa fa-apple", "fa fa-css3", "fa fa-diamond", "fa fa-windows", "fa fa-bolt", "fa fa-qq"];


const cardsContainer = document.querySelector(".deck");
let openedCards = [];
let matchedCards = [];
const repeatBtn = document.querySelector(".features .play-again");
const repeatBtnFromModal = document.querySelector(".modal .play-again");
/*
*Initialize the game
*/
function init() {
  shuffle(icons);
  for (let i =0; i < icons.length; i++){
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    cardsContainer.appendChild(card);
    click(card);
  }
}
/*
*click event
*/
let isFirstClick = true;
function click(card){
  card.addEventListener("click", function() {
    if(isFirstClick) {
            // Start our timer
            startTimer();
            // Change our First Click indicator's value
            isFirstClick = false;
        }
    const currentCard = this;
    const previousCard = openedCards[0];
    if (openedCards.length === 1){
        card.classList.add("open", "show", "disable");
        openedCards.push(this);
        compare(currentCard, previousCard);
    }
    else{
        currentCard.classList.add("open", "show", "disable");
        openedCards.push(this);
    }
  });
}
/*
*Compare cards
*/
function compare(currentCard, previousCard){
  if (currentCard.innerHTML === previousCard.innerHTML){
    currentCard.classList.add("match");
    previousCard.classList.add("match");
    matchedCards.push(currentCard, previousCard);
    openedCards = [];
    isOver();
  }
  else {
    setTimeout(function(){
    currentCard.classList.remove("open", "show", "disable");
    previousCard.classList.remove("open", "show", "disable");
  }, 700);
  openedCards = [];
  }
  addMove()
}

/*
*ending the game
*/
function isOver (){
  if (matchedCards.length === icons.length){
    // If the game is finished display modal
gameOverMessage();
}
}
const modal = document.querySelector('.modal');

// Game Over Message Modal
function gameOverMessage() {

// Display modal box
modal.style.display = "block";

// Select the Moves
const modalMoves = document.querySelector("#moves");
// Change its value to the user moves
modalMoves.innerHTML = `${moves} moves to complete!`;
// Select the time
const modalSeconds = document.querySelector('#totalSeconds');
// Change time value to the user seconds
modalSeconds.innerHTML = `${totalSeconds} seconds to complete!`;
// Select the rate
const modalRate = document.querySelector('#star');
// Change time value to the user seconds
modalRate.innerHTML = `${star} stars!`;
stopTimer();
document.querySelector(".init").addEventListener("click", function() {
    reset();
  modal.style.display = "none";

 });
}
//stop timer
function stopTimer() {
    clearInterval(liveTimer);
}
/*
*Move counter
*/
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove (){
  moves++;
  movesContainer.innerHTML = moves;
  rating();
}
/*
*Rating
*/
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
function rating(){
  switch(moves) {
    case 5:
      starsContainer.innerHTML = star + star
    break;
    case 10:
      starsContainer.innerHTML = star;
    break;
    case 15:
      starsContainer.innerHTML = `<li><i class="fa fa-bomb"></i></li>`;
    break;
    case 20:
      starsContainer.innerHTML = "Just stop already";
    break;
  }
}
/*
 * Timer
 */
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = 0;
timerContainer.innerHTML = totalSeconds + 's';
function startTimer() {
    liveTimer = setInterval(function() {
        totalSeconds++;
        timerContainer.innerHTML = totalSeconds + 's';
    }, 1000);
}
/*
*Restart Button
*/
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function(){
  cardsContainer.innerHTML = "";
  init();
  reset();
})
/*
 * function to Reset All Game Variables
 */
 function reset() {
     matchedCards = [];
     moves = 0;
     movesContainer.innerHTML = moves;
     starsContainer.innerHTML = star + star + star;
     stopTimer();
     isFirstClick = true;
     totalSeconds = 0;
     timerContainer.innerHTML = totalSeconds + "s";
 }
//////////////////Start Game for first time
init();

//////////////////////////////////SHUFFLE CODE/////////////////////////

function shuffle(icons) {
    var currentIndex = icons.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = icons[currentIndex];
        icons[currentIndex] = icons[randomIndex];
        icons[randomIndex] = temporaryValue;
    }

    return icons;
}
