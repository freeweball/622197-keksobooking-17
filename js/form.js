'use strict';

(function () {
  var searchForm = document.querySelector('.ad-form').querySelectorAll('fieldset');
  var advertMap = document.querySelector('.map');
  var advertForm = document.querySelector('.ad-form');
  var advertMapFilter = document.querySelector('.map__filters');
  var adCapacityMap = {
    '1': [1],
    '2': [1, 2],
    '3': [1, 2, 3],
    '100': [0]
  };
  var adForm = document.querySelector('.ad-form');
  var pageMain = document.querySelector('main');

  var activationFields = function () {
    advertMap.classList.remove('map--faded');
    advertForm.classList.remove('ad-form--disabled');
    advertMapFilter.classList.remove('map__filters--disabled');

    for (var i = 0; i < searchForm.length; i++) {
      searchForm[i].removeAttribute('disabled');
    }
  };

  var formOptionRooms = advertForm.querySelector('#room_number');
  var formOptionGuest = advertForm.querySelector('#capacity');

  var onInputGuestChange = function (room, guest) {
    var selectedGuestsOptions = guest.children;

    [].slice.call(selectedGuestsOptions).forEach(function (item) {
      item.disabled = !~adCapacityMap[room.value].indexOf(+item.value) ? true : false;
    });
    guest.value = ~adCapacityMap[room.value].indexOf(+guest.value)
      ? guest.value
      : adCapacityMap[room.value][0];
  };

  formOptionRooms.addEventListener('change', function () {
    onInputGuestChange(formOptionRooms, formOptionGuest);
  });

  var adFormSubmit = function (evt) {
    evt.preventDefault();
    var adFormSubmitTemplate = document.querySelector('#success').content.querySelector('.success');
    var adFormElement = adFormSubmitTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(adFormElement);
    pageMain.appendChild(fragment);
  };

  var adFormInvalid = function (evt) {
    evt.preventDefault();
    var adFormInvalidTemplate = document.querySelector('#error').content.querySelector('.error');
    var adFormElement = adFormInvalidTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(adFormElement);
    pageMain.appendChild(fragment);
  };

  adForm.addEventListener('submit', adFormSubmit);
  adForm.addEventListener('invalid', adFormInvalid);

  window.form = {
    activationFields: activationFields
  };
})();
