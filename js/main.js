'use strict';

var MAX_QUANTITY = 8;
var TYPE_VALUE = ['palace', 'flat', 'house', 'bungalo'];
var PIN_SHIFT_X = 25;
var PIN_SHIFT_Y = 70;
// var MAP_PIN_SHIFT_X = 87;
// var MAP_PIN_SHIFT_Y = 32.5;

var getRandomNumber = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);

  return Math.floor(randomNumber);
};

var getRandomValue = function (arr) {
  var randomValue = arr[Math.floor(Math.random() * arr.length)];

  return randomValue;
};

var getPinData = function (amount) {
  var arrValues = [];

  for (var i = 0; i < amount; i++) {
    arrValues[i] = {
      author: {
        avatar: 'img/avatars/user0' + [i + 1] + '.png'
      },
      offer: {
        type: getRandomValue(TYPE_VALUE)
      },
      location: {
        x: getRandomNumber(130 - PIN_SHIFT_X, 1200 - PIN_SHIFT_X) + 'px',
        y: getRandomNumber(130 + PIN_SHIFT_Y, 630 + PIN_SHIFT_Y) + 'px'
      }
    };
  }

  return arrValues;
};

var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getPin = function (data) {
  var pinElement = pinTemplate.cloneNode(true);
  var searchPicture = pinElement.querySelector('img');

  pinElement.style.left = data.location.x;
  pinElement.style.top = data.location.y;
  searchPicture.src = data.author.avatar;
  searchPicture.alt = data.offer.type;

  return pinElement;
};
var renderPins = function () {
  var fragment = document.createDocumentFragment();
  var pinContent = getPinData(MAX_QUANTITY);

  for (var i = 0; i < MAX_QUANTITY; i++) {
    fragment.appendChild(getPin(pinContent[i]));
  }

  pinList.appendChild(fragment);
};

// Работа с формами.
var searchForm = document.querySelector('.ad-form').querySelectorAll('fieldset');
var advertMap = document.querySelector('.map');
var advertForm = document.querySelector('.ad-form');
var advertMapFilter = document.querySelector('.map__filters');
var advertPin = document.querySelector('.map__pin--main');
var mapPin = document.querySelector('.map__pin--main');
var mapPinValue = document.querySelector('#address');


// // // Делает поля формы не активнымии.
// // var deActivationFields = function () {
// //   for (var i = 0; i < searchForm.length; i++) {
// //     searchForm[i].setAttribute('disabled', 'true');
// //   }
// // };

// deActivationFields();

// Делает поля формы активными.
var activationFields = function () {
  for (var i = 0; i < searchForm.length; i++) {
    searchForm[i].setAttribute('disabled', 'false');
    advertMap.classList.remove('map--faded');
    advertForm.classList.remove('ad-form--disabled');
    advertMapFilter.classList.remove('map__filters--disabled');
  }
};

advertPin.addEventListener('click', function () {
  activationFields();
  renderPins();
  advertPin.setAttribute('disabled', 'true');
});



mapPin.addEventListener('mouseup', function () {
  mapPinValue.value = '570, 375';
});

