'use strict';

(function () {
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var adFormType = document.querySelector('#type');
  var minPrice = document.querySelector('#price');
  var adMinValue = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var changeValue = function (current, chengeable) {
    chengeable.value = current.value;
  };

  var timeOutChangeHandler = function () {
    window.util.changeValue(timeOut, timeIn);
  };

  var timeIntChangeHandler = function () {
    changeValue(timeIn, timeOut);
  };

  var formTypePriceChange = function () {
    var selectedValue = adFormType.value;
    var minValue = adMinValue[selectedValue];

    minPrice.min = minValue;
    minPrice.placeholder = minValue.toString();
  };

  window.util = {
    changeValue: changeValue,
    timeOutChangeHandler: timeOutChangeHandler,
    timeIntChangeHandler: timeIntChangeHandler,
    formTypePriceChange: formTypePriceChange
  };
})();
