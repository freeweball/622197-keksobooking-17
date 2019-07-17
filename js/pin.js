'use strict';

(function () {

  var MAX_QUANTITY = 8;
  var TYPE_VALUE = ['palace', 'flat', 'house', 'bungalo'];
  var PIN_SHIFT_X = 25;
  var PIN_SHIFT_Y = 70;
  var Y_MIN = 130;
  var Y_MAX = 630;
  var X_MIN = 25;
  var PIN_WIDTH = 65;
  var X_MAX = document.querySelector('.map').getBoundingClientRect().width - PIN_WIDTH;

  var getPinData = function (amount) {
    var arrValues = [];

    for (var i = 0; i < amount; i++) {
      arrValues[i] = {
        author: {
          avatar: 'img/avatars/user0' + [i + 1] + '.png'
        },
        offer: {
          type: window.util.getRandomValue(TYPE_VALUE)
        },
        location: {
          x: window.util.getRandomNumber(X_MIN - PIN_SHIFT_X, X_MAX) + 'px',
          y: window.util.getRandomNumber(Y_MIN - PIN_SHIFT_Y, Y_MAX - PIN_SHIFT_Y) + 'px'
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

  window.pin = {
    renderPins: renderPins
  };
})();
