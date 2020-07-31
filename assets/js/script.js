var gameCards = document.getElementById('gameCards');
var statsSec = document.getElementById('stats-sec');
var cardSecChildren = gameCards.children;
var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses = null;
var secondCardClasses = null;
var maxMatches = 9;
var matches = 0;
var attempts = 0;
var gamesPlayed = 0;
var modal = document.querySelector('.win-modal');
var resetButton = document.getElementById('resetButton');
var addImage = 0;

var picArray = [
  "naruto",
  "itachi",
  "jiraiya",
  "lee",
  "madara",
  "orochimaru",
  "pain",
  "sakura",
  "sasuke"
]

createCards();

gameCards.addEventListener('click', handleClick);

resetButton.addEventListener('click', resetGame);

function createCards(){
  for (var i = 0; i < 18; i++) {
    var cardContain = document.createElement('div');
    var cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    var cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    cardFront.classList.add(picArray[addImage]);
    cardContain.className = 'col-2 card'
    cardContain.append(cardFront, cardBack);
    gameCards.appendChild(cardContain);
    addImage++;
    if (addImage === 9) {
      addImage = 0;
    }
  }
}

function handleClick(event){
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  event.target.classList.add('hidden');
  if (!firstCardClicked) {
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  } else {
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    gameCards.removeEventListener('click', handleClick);
    if (firstCardClasses === secondCardClasses){
      gameCards.addEventListener('click', handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      matches++;
      attempts++;
      if (matches === maxMatches){
        modal.classList.remove('hidden');
      }
    } else {
      setTimeout(function () {
        firstCardClicked.classList.remove('hidden');
        secondCardClicked.classList.remove('hidden');
        gameCards.addEventListener('click', handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
      }, 1500);
      attempts++;
    }
    displayStats();
  }
}

function displayStats(){
  document.getElementById('gamesPlayed').textContent = gamesPlayed;
  document.getElementById('attempts').textContent = attempts;
  document.getElementById('accuracy').textContent = calculateAccuracy(attempts, matches);
}

function calculateAccuracy(attempts, matches){
  if (!attempts){
    return '0%';
  }
  return Math.trunc((matches / attempts) * 100) + '%';
}

function resetGame(){
  matches = 0;
  attempts = 0;
  gamesPlayed++;
  displayStats();
  removeCards();
  modal.classList.add('hidden');
  createCards();
}

function removeCards(){
  gameCards.innerHTML = '';
}
