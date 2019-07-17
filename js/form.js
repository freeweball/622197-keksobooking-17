'use strict';

(function () {
  var searchForm = document.querySelector('.ad-form').querySelectorAll('fieldset');
  var advertMap = document.querySelector('.map');
  var advertForm = document.querySelector('.ad-form');
  var advertMapFilter = document.querySelector('.map__filters');

  var activationFields = function () {
    advertMap.classList.remove('map--faded');
    advertForm.classList.remove('ad-form--disabled');
    advertMapFilter.classList.remove('map__filters--disabled');

    for (var i = 0; i < searchForm.length; i++) {
      searchForm[i].removeAttribute('disabled');
    }
  };

  window.form = {
    activationFields: activationFields
  };
})();
