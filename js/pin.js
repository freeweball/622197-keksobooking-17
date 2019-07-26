'use strict';

(function () {

  var inputHousing = document.querySelector('#housing-type');
  window.dataPin = [];

  var successHandler = function (pins) {
    window.dataPin = pins;
  };

  var filterTypeHousing = function () {
    var pinList = document.querySelector('.map__pins');
    var inputHousings = pinList.querySelectorAll('button');
    var pinMain = document.querySelector('.map__pin--main');
    var elementFilter;

    inputHousings.forEach(function (element) {
      if (element !== pinMain) {
        pinList.removeChild(element);
      }
    });

    var elementInputHousing = document.querySelector('#housing-type');
    var selectedValue = elementInputHousing.value;

    selectedValue.toString();

    if (selectedValue !== 'any') {
      elementFilter = window.dataPin.slice().filter(function (it) {
        elementFilter = (it.offer.type === selectedValue);
        return elementFilter;
      });
      elementFilter.slice(0, 5);
    } else {
      elementFilter = window.dataPin.slice(0, 5);
    }

    window.renderPin(elementFilter);
  };

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

  window.renderPin = function (it) {
    var pinList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    var newData = it.slice(0, 5);

    for (var i = 0; i < newData.length; i++) {
      fragment.appendChild(getPin(newData[i]));
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

  inputHousing.addEventListener('change', filterTypeHousing);

  window.load(successHandler, errorHandler);
})();
