'use strict';

(function () {
  var searchForm = document.querySelector('.ad-form').querySelectorAll('fieldset');
  var advertMap = document.querySelector('.map');
  var advertForm = document.querySelector('.ad-form');
  var advertMapFilter = document.querySelector('.map__filters');
  var pageMain = document.querySelector('main');
  var formOptionRooms = advertForm.querySelector('#room_number');
  var formOptionGuest = advertForm.querySelector('#capacity');
  var form = document.querySelector('.ad-form');
  var pinItemMain = document.querySelector('.map__pin--main');
  var adCapacityMap = {
    '1': [1],
    '2': [1, 2],
    '3': [1, 2, 3],
    '100': [0]
  };

  var activationFields = function () {
    advertMap.classList.remove('map--faded');
    advertForm.classList.remove('ad-form--disabled');
    advertMapFilter.classList.remove('map__filters--disabled');

    for (var i = 0; i < searchForm.length; i++) {
      searchForm[i].removeAttribute('disabled');
    }
  };

  var deActivationFields = function () {
    advertMap.classList.add('map--faded');
    advertForm.classList.add('ad-form--disabled');
    advertMapFilter.classList.add('map__filters--disabled');

    for (var i = 0; i < searchForm.length; i++) {
      searchForm[i].setAttribute('disabled', 'disabled');
    }
  };

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

  var closeMessageSuccess = function () {
    var messageSuccess = document.querySelector('.success');

    pageMain.removeChild(messageSuccess);
  };

  advertForm.addEventListener('submit', adFormSubmit);

  advertForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function () {});
    evt.preventDefault();
    form.reset();
    if (window.popupFlag) {
      window.closePopup();
    }
    window.deletePin();
    deActivationFields();
    pinItemMain.style.left = window.startCoordPinMain.x;
    pinItemMain.style.top = window.startCoordPinMain.y;
    window.dragged = false;
  });

  advertForm.addEventListener('invalid', adFormInvalid);
  pageMain.addEventListener('click', function () {
    closeMessageSuccess();
  });

  document.addEventListener('keydown', function (evt) {
    var ESC_KEYCODE = 27;

    if (evt.keyCode === ESC_KEYCODE) {
      closeMessageSuccess();
    }
  });

  window.form = {
    activationFields: activationFields
  };
})();
