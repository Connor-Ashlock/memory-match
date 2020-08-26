var gameCards = document.getElementById('game-cards');
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
var endGameContainer = document.querySelector('.end-game-container');
var endGameContent = document.getElementById('end-game-content');
var resetButton = document.getElementById('reset-button');
var missed = 0;
var endGameText = document.querySelector('.end-game-text');
var timer = document.getElementById('timer');
var min = 3;
var sec = 0;
var wonGame = null;

var picArray = [
  "naruto",
  "itachi",
  "jiraiya",
  "lee",
  "madara",
  "orochimaru",
  "pain",
  "sakura",
  "sasuke",
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

gameCards.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);

function createCards(){
  for (var i = 0; i < 18; i++) {
    var cardContain = document.createElement('div');
    var cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    var cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    cardFront.classList.add(picArray[i]);
    cardContain.className = 'col-2 card-position center'
    cardContain.append(cardFront, cardBack);
    gameCards.appendChild(cardContain);
  }
}

function handleClick(event){
  if (attempts === 0 && !firstCardClicked){
    countDownOnClick();
  }
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
        wonGame = true;
        winGame();
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
      missed++;
      if (missed === 10) {
        wonGame = false;
        loseGame();
      }
    }
    displayStats();
  }
}

function displayStats() {
  document.getElementById('gamesPlayed').textContent = gamesPlayed;
  document.getElementById('attempts').textContent = attempts;
  document.getElementById('accuracy').textContent = calculateAccuracy(attempts, matches);
}

function calculateAccuracy(attempts, matches) {
  if (!attempts){
    return '0%';
  }
  return Math.trunc((matches / attempts) * 100) + '%';
}

function resetGame() {
  matches = 0;
  attempts = 0;
  missed = 0;
  min = 3;
  sec = 0;
  wonGame = null;
  sec = checkTime(sec);
  timer.textContent = `${min}:${sec}`;
  gamesPlayed++;
  endGameContent.className = 'center';
  displayStats();
  removeCards();
  removeModal();
  shuffleCards(picArray);
  createCards();
}

function removeCards() {
  gameCards.innerHTML = '';
}

function shuffleCards(array) {
  for (var i = 0; i < array.length; i++){
    var randomNum = Math.floor(Math.random() * array.length);
    var store = array[i];
    array[i] = array[randomNum];
    array[randomNum] = store;
  }
  return array;
}

function winGame() {
  showModal();
  endGameText.textContent = 'You Won Believe It!';
  endGameContent.classList.add('win-modal-content');
}

function loseGame() {
  showModal();
  endGameText.textContent = 'You Lose Never Give Up!';
  endGameContent.classList.add('lose-modal-content');
}

function showModal() {
  endGameContainer.classList.remove('hidden');
}

function removeModal() {
  endGameContainer.classList.add('hidden');
}

function checkTime(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

function countDownOnClick() {
  var intId = setInterval(countDown, 1000);
  function countDown() {
    if (sec === '0' + 0) {
      sec = 59;
      min--;
      sec = checkTime(sec);
    } else {
      sec--;
      sec = checkTime(sec);
    }
    timer.textContent = `${min}:${sec}`;
    if (timer.textContent === '0:00') {
      clearInt();
      loseGame();
    }
    if (wonGame === true) {
      clearInt();
    }
    if (wonGame === false) {
      clearInt();
    }
  }
  function clearInt() {
    clearInterval(intId);
  }
}

function start() {
  shuffleCards(picArray);
  createCards();
  sec = checkTime(sec)
  timer.textContent = `${min}:${sec}`;
}

start();
