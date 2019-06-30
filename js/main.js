'use strict';

var minQuantity = 1;
var maxQuantity = 8;
var typeValue = ['palace', 'flat', 'house', 'bungalo'];

var getRandomNumber = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  randomNumber = Math.floor(randomNumber);
  return randomNumber;
};

var getRandomUrl = function (min, max) {
  var url = 'img/avatars/user' + 0 + getRandomNumber(min, max) + '.png';
  return url;
};

var getRandomValue = function (arr) {
  var randomValue = arr[Math.floor(Math.random() * arr.length)];
  return randomValue;
};

var getArrValue = function (amount) {
  var arrValues = [];
  for (var i = 0; i < amount; i++) {
    arrValues[i] = {
      'author': {
        'avatar': getRandomUrl(minQuantity, maxQuantity)
      },
      'offer': {
        'type': getRandomValue(typeValue)
      },
      'location': {
        'x': getRandomNumber(0, 1200) + 'px',
        'y': getRandomNumber(130, 630) + 'px'
      }
    };
  }
  return arrValues;
};

var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getPin = function (data) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = data.location.x;
  pinElement.style.top = data.location.y;
  pinElement.querySelector('img').src = data.author.avatar;
  pinElement.querySelector('img').alt = data.offer.type;
  return pinElement;
};

var fragment = document.createDocumentFragment();
var pinContent = getArrValue(maxQuantity);
for (var i = 0; i < maxQuantity; i++) {
  fragment.appendChild(getPin(pinContent[i]));
}

pinList.appendChild(fragment);

document.querySelector('.map').classList.remove('map--faded');
