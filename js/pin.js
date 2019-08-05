'use strict';

(function () {
  var PIN_SHIFT_X = 25;
  var PIN_SHIFT_Y = 70;
  window.dataPin = [];

  var successHandler = function (pins) {
    window.dataPin = pins;
  };

  var getPin = function (data) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);
    var searchPicture = pinElement.querySelector('img');

    pinElement.style.left = (data.location.x - PIN_SHIFT_X) + 'px';
    pinElement.style.top = (data.location.y - PIN_SHIFT_Y) + 'px';
    searchPicture.src = data.author.avatar;
    searchPicture.alt = data.offer.type;

    return pinElement;
  };

  window.renderPin = function (item) {
    var pinList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    var newData = item.slice(0, 5);

    for (var i = 0; i < newData.length; i++) {
      if (newData[i].offer) {
        fragment.appendChild(getPin(newData[i]));
      }
    }

    pinList.appendChild(fragment);
  };

  window.deletePin = function () {
    var pinList = document.querySelector('.map__pins');
    var pinItem = document.querySelectorAll('.map__pin');

    for (var i = 1; i < pinItem.length; i++) {
      pinList.removeChild(pinItem[i]);
    }
  };

  var errorHandler = function () {
    var templateError = document.querySelector('#error').content.querySelector('.error');
    var tagMain = document.querySelector('main');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(templateError);
    tagMain.appendChild(fragment);
  };

  window.load(successHandler, errorHandler);
})();
