'use strict';

var MAX_QUANTITY = 8;
var TYPE_VALUE = ['palace', 'flat', 'house', 'bungalo'];
var PIN_SHIFT_X = 25;
var PIN_SHIFT_Y = 70;
var Y_MIN = 130;
var Y_MAX = 630;
var X_MIN = 133;
var X_MAX = document.querySelector('.map').getBoundingClientRect().width;
var MAP_PIN_SHIFT_X = 87;
var MAP_PIN_SHIFT_Y = 32.5;

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
        x: getRandomNumber(X_MIN - PIN_SHIFT_X, X_MAX - PIN_SHIFT_X) + 'px',
        y: getRandomNumber(Y_MIN - PIN_SHIFT_Y, Y_MAX - PIN_SHIFT_Y) + 'px'
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

var searchForm = document.querySelector('.ad-form').querySelectorAll('fieldset');
var advertMap = document.querySelector('.map');
var advertForm = document.querySelector('.ad-form');
var advertMapFilter = document.querySelector('.map__filters');
var advertPin = document.querySelector('.map__pin--main');
var advertPinX = advertPin.getBoundingClientRect().left - MAP_PIN_SHIFT_X;
var advertPinY = advertPin.getBoundingClientRect().top - MAP_PIN_SHIFT_Y;
var mapPinValue = document.querySelector('#address');

var activationFields = function () {
  advertMap.classList.remove('map--faded');
  advertForm.classList.remove('ad-form--disabled');
  advertMapFilter.classList.remove('map__filters--disabled');

  for (var i = 0; i < searchForm.length; i++) {
    searchForm[i].removeAttribute('disabled');
  }
};

advertPin.addEventListener('click', function () {
  activationFields();
  renderPins();
  advertPin.setAttribute('disabled', 'true');
});

advertPin.addEventListener('mouseup', function () {
  mapPinValue.value = advertPinX + ', ' + advertPinY;
});

var minPrice = document.querySelector('#price');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var adForm = document.querySelector('.ad-form');
var adFormType = document.querySelector('#type');

var adMinValue = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var formTypePriceChange = function () {
  var selectedValue = adFormType.value;
  var minValue = adMinValue[selectedValue];

  minPrice.min = minValue;
  minPrice.placeholder = minValue.toString();
};

var changeValue = function (current, chengeable) {
  chengeable.value = current.value;
};

var timeOutChangeHandler = function () {
  changeValue(timeOut, timeIn);
};

var timeIntChangeHandler = function () {
  changeValue(timeIn, timeOut);
};

adForm.addEventListener('change', formTypePriceChange);
timeIn.addEventListener('change', timeIntChangeHandler);
timeOut.addEventListener('change', timeOutChangeHandler);
