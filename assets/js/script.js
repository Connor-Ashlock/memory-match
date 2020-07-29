var cardSec = document.getElementById('card-sec');
var statsSec = document.getElementById('stats-sec');
var cardSecChildren = cardSec.children;


for (var i = 0; i < cardSecChildren.length; i++){
  var cardBack = document.createElement('div');
  cardBack.className = 'card-back'
  var cardFront = document.createElement('div');
  cardFront.className = 'card-front';
  cardSecChildren[i].append(cardBack, cardFront);
  cardSecChildren[i].classList.add('card');
}
