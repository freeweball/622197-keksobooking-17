'use strict';

(function () {
  var PIN_WIDTH = 65;
  var Y_MIN = 130;
  var Y_MAX = 630;
  var X_MIN = 25;
  var X_MAX = document.querySelector('.map').getBoundingClientRect().width - PIN_WIDTH;
  var PIN_SHIFT_X = 25;
  var adForm = document.querySelector('.ad-form');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var advertPin = document.querySelector('.map__pin--main');
  var mapPinValue = document.querySelector('#address');

  window.dragged = false;

  adForm.addEventListener('change', window.util.formTypePriceChange);
  timeIn.addEventListener('change', window.util.timeIntChangeHandler);
  timeOut.addEventListener('change', window.util.timeOutChangeHandler);

  advertPin.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    window.startCoordPinMain = {
      x: advertPin.style.left,
      y: advertPin.style.top
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinTopPosition = (advertPin.offsetTop - shift.y);
      var pinLeftPosition = (advertPin.offsetLeft - shift.x);

      advertPin.style.position = 'absolute';

      if (pinTopPosition >= Y_MIN && pinTopPosition <= Y_MAX && pinLeftPosition >= X_MIN - PIN_SHIFT_X && pinLeftPosition <= X_MAX) {
        advertPin.style.top = pinTopPosition + 'px';
        advertPin.style.left = pinLeftPosition + 'px';
        mapPinValue.value = (pinLeftPosition + PIN_WIDTH / 2 - shift.y) + ', ' + (pinTopPosition + PIN_WIDTH / 2 - shift.x);
      }
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      if (!window.dragged) {
        window.form.activationFields();
        window.renderPin(window.dataPin);
      }

      window.dragged = true;

      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
