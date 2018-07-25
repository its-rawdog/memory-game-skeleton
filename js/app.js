/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-android", "fa fa-bomb", "fa fa-apple", "fa fa-css3", "fa fa-diamond", "fa fa-windows", "fa fa-bolt", "fa fa-qq", "fa fa-android", "fa fa-bomb", "fa fa-apple", "fa fa-css3", "fa fa-diamond", "fa fa-windows", "fa fa-bolt", "fa fa-qq"];
const cardsContainer = document.querySelector(".deck");
let openedCards = [];
let matchedCards = [];
/*
*Initialize the game
*/
function init() {
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
function click(card){
  card.addEventListener("click", function() {
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
    alert("Booya!");
  }
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
function rating(){
  switch(moves) {
    case 20:
      starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>`;
    break;
    case 25:
      starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    break;
    case 30:
      starsContainer.innerHTML = `<li><i class="fa fa-bomb"></i></li>`;
    break;
  }
}
/*
*Restart Button
*/
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function(){
  cardsContainer.innerHTML = "";
  init();
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  shuffle(icons);
})
//////////////////Start Game for first time
shuffle(icons);
init();
//////////////////////////////////UDACITY SHUFFLE CODE/////////////////////////
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
