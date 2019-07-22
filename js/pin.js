'use strict';

(function () {
  window.pin = function () {
    var getPin = function (data) {
      var PIN_SHIFT_X = 25;
      var PIN_SHIFT_Y = 70;
      var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
      var pinElement = pinTemplate.cloneNode(true);
      var searchPicture = pinElement.querySelector('img');

      pinElement.style.left = (data.location.x - PIN_SHIFT_X) + 'px';
      pinElement.style.top = (data.location.y - PIN_SHIFT_Y) + 'px';
      searchPicture.src = data.author.avatar;
      searchPicture.alt = data.offer.type;

      return pinElement;
    };

    var successHandler = function (pins) {
      var pinList = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < pins.length; i++) {
        fragment.appendChild(getPin(pins[i]));
      }

      pinList.appendChild(fragment);
    };

    var errorHandler = function () {
      var templateError = document.querySelector('#error').content.querySelector('.error');
      var tagMain = document.querySelector('main');
      var fragment = document.createDocumentFragment();
      fragment.appendChild(templateError);
      tagMain.appendChild(fragment);
    };

    window.load(successHandler, errorHandler);
  };
})();
