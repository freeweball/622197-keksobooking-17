'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var MainPinData = {
    WIDTH: 65,
    HEIGHT: 65,
    ARROW_HEIGHT: 18,
    BLOCK: document.querySelector('.map__pin--main'),

    getLocation: function () {
      return {
        X: this.BLOCK.offsetLeft,
        Y: this.BLOCK.offsetTop
      };
    }
  };
  window.AddressValue = {
    INITIAL: (MainPinData.getLocation().X + MainPinData.WIDTH / 2) + ', ' +
    (MainPinData.getLocation().Y + MainPinData.HEIGHT / 2),
    NEW: 0
  };
  var searchForm = document.querySelector('.ad-form').querySelectorAll('fieldset');
  var advertMap = document.querySelector('.map');
  var advertForm = document.querySelector('.ad-form');
  var advertMapFilter = document.querySelector('.map__filters');
  var pageMain = document.querySelector('main');
  var formOptionRooms = advertForm.querySelector('#room_number');
  var formOptionGuest = advertForm.querySelector('#capacity');
  var form = document.querySelector('.ad-form');
  var pinItemMain = document.querySelector('.map__pin--main');
  var resetButton = document.querySelector('.ad-form__reset');
  var formFilter = document.querySelector('.map__filters');
  var formAddress = document.querySelector('#address');
  var formPrice = document.querySelector('#price');
  var formPriceStart = '1000';
  var adCapacityMap = {
    '1': [1],
    '2': [1, 2],
    '3': [1, 2, 3],
    '100': [0]
  };

  formAddress.value = window.AddressValue.INITIAL;

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
      searchForm[i].disabled = 'true';
    }
  };

  var onInputGuestChange = function (room, guest) {
    var selectedGuestsOptions = guest.children;

    [].slice.call(selectedGuestsOptions).forEach(function (item) {
      item.disabled = !~adCapacityMap[room.value].indexOf(+item.value);
    });
    guest.value = ~adCapacityMap[room.value].indexOf(+guest.value)
      ? guest.value
      : adCapacityMap[room.value][0];
  };

  formOptionRooms.addEventListener('change', function () {
    onInputGuestChange(formOptionRooms, formOptionGuest);
  });

  var adFormSubmit = function () {
    var adFormSubmitTemplate = document.querySelector('#success').content.querySelector('.success');
    var adFormElement = adFormSubmitTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(adFormElement);
    pageMain.appendChild(fragment);
  };

  var adFormInvalid = function () {
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

  var onClickResetBooking = function () {
    formFilter.reset();
    form.reset();
    if (window.popupFlag) {
      window.closePopup();
    }
    window.deletePin();
    deActivationFields();

    pinItemMain.style.left = window.startCoordPinMain.x;
    pinItemMain.style.top = window.startCoordPinMain.y;
    formAddress.value = window.AddressValue.INITIAL;
    formPrice.placeholder = formPriceStart;
  };

  advertForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(form), function () {});
    onClickResetBooking();
    adFormSubmit();
  });

  advertForm.addEventListener('invalid', adFormInvalid);

  pageMain.addEventListener('click', function () {
    if (document.querySelector('.success')) {
      closeMessageSuccess();
      window.dragged = false;
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (document.querySelector('.success')) {
        closeMessageSuccess();
      }
    }
  });

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    onClickResetBooking();
  });

  window.form = {
    activationFields: activationFields
  };
})();
