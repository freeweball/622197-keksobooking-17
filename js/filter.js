'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingPriceSelect = document.querySelector('#housing-price');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var housingGuestsSelect = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var lastTimeout;
  var DEBOUNCE_INTERVAL = 500;

  var onChangeFilterAll = function () {
    window.deletePin();

    var filteredPins = window.dataPin.filter(function (it) {
      if (document.querySelector('.popup')) {
        window.closePopup();
      }
      return filterHousingType(it) && filterHousingPrice(it) && filterHousingRooms(it) && filterHousingGuests(it) && filterFeatures(it);
    });

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(function () {
      window.renderPin(filteredPins);
    }, DEBOUNCE_INTERVAL);
  };

  var filterHousingType = function (pin) {
    if (housingTypeSelect.value === 'any') {
      return true;
    }

    return housingTypeSelect.value === pin.offer.type;
  };

  var filterHousingPrice = function (pin) {
    if (housingPriceSelect.value === 'any') {
      return true;
    } else if (housingPriceSelect.value === 'low') {
      return (pin.offer.price < 10000);
    } else if (housingPriceSelect.value === 'middle') {
      return (pin.offer.price >= 10000 && pin.offer.price < 50000);
    } else if (housingPriceSelect.value === 'high') {
      return (pin.offer.price >= 50000);
    }

    return false;
  };

  var filterHousingRooms = function (pin) {
    if (housingRoomsSelect.value === 'any') {
      return true;
    }

    return parseInt(housingRoomsSelect.value, 10) === pin.offer.rooms;
  };

  var filterHousingGuests = function (pin) {
    if (housingGuestsSelect.value === 'any') {
      return true;
    }

    return parseInt(housingGuestsSelect.value, 10) === pin.offer.guests;
  };

  var filterFeatures = function (it) {
    var checkedFeatures = housingFeatures.querySelectorAll('input:checked');
    return Array.from(checkedFeatures).every(function (element) {
      return it.offer.features.includes(element.value);
    });
  };

  mapFilters.addEventListener('change', onChangeFilterAll);
})();
