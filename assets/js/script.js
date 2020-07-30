var gameCards = document.getElementById('gameCards');
var statsSec = document.getElementById('stats-sec');
var cardSecChildren = gameCards.children;

var picArray = [
  "js-logo",
  "css-logo",
  "docker-logo",
  "github-logo",
  "html-logo",
  "mysql-logo",
  "node-logo",
  "php-logo",
  "react-logo"
]

var addImage = 0;

for (var i = 0; i < cardSecChildren.length; i++){
  var cardBack = document.createElement('div');
  cardBack.className = 'card-back';
  var cardFront = document.createElement('div');
  cardFront.className = 'card-front';
  cardFront.classList.add(picArray[addImage]);
  cardSecChildren[i].append(cardFront, cardBack);
  cardSecChildren[i].classList.add('card');
  addImage++;
  if (addImage === 9) {
    addImage = 0;
  }
}

gameCards.addEventListener('click', handleClick);

function handleClick(event){
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  console.log(event);
  event.target.classList.add('hidden');
}
