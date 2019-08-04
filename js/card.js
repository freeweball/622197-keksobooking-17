'use strict';

(function () {

  var typesMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var pinField = document.querySelector('.map__pins');
  window.popupFlag = false;

  var renderAdFeatures = function (dataFeatures, featuresNode) {
    var currentFeatures = dataFeatures.offer.features;
    var featuresArray = [].slice.call(featuresNode.children);

    featuresArray.forEach(function (item, index) {
      if (index >= currentFeatures.length) {
        featuresNode.removeChild(item);
      }

      item.textContent = currentFeatures[index];
    });
  };

  var renderAdPhotos = function (dataPhoto, photosNode) {
    var currentPhotos = dataPhoto.offer.photos;
    var currentAdPhoto = photosNode.children[0];
    var photosFragment = document.createDocumentFragment();

    currentPhotos.forEach(function (item, index) {
      var tempAdPhoto = currentAdPhoto.cloneNode(true);

      tempAdPhoto.src = currentPhotos[index];
      photosFragment.appendChild(tempAdPhoto);
    });

    photosNode.appendChild(photosFragment);
    currentAdPhoto.remove();
  };

  var getCard = function (data) {
    var cardBlock = document.querySelector('#card').content.querySelector('.map__card');
    var adCard = cardBlock.cloneNode(true);

    adCard.querySelector('.popup__title').textContent = data.offer.title;
    adCard.querySelector('.popup__text--address').textContent = data.offer.address;
    adCard.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    adCard.querySelector('.popup__type').textContent = typesMap[data.offer.type];
    adCard.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для '
    + data.offer.guests + ' гостей';
    adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin
    + ', выезд до' + data.offer.checkout;
    adCard.querySelector('.popup__description').textContent = data.offer.description;
    adCard.querySelector('.popup__avatar').src = data.author.avatar;

    var adCardFeatures = adCard.querySelector('.popup__features');
    if (data.offer.features.length) {
      renderAdFeatures(data, adCardFeatures);
    } else {
      adCard.removeChild(adCardFeatures);
    }

    var adCardPhotos = adCard.querySelector('.popup__photos');
    if (data.offer.photos.length) {
      renderAdPhotos(data, adCardPhotos);
    } else {
      adCard.removeChild(adCardPhotos);
    }

    return adCard;
  };

  var renderCard = function (dataCard) {
    var cardList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    fragment.appendChild(getCard(dataCard));
    cardList.appendChild(fragment);
  };

  var openPopup = function (evt, filter) {
    evt.classList.add('map__pin--active');
    renderCard(filter[0]);
    window.popupFlag = true;
  };

  var openNewPopup = function (data, event) {
    var cardPopup = document.querySelector('.popup');
    var pinActive = document.querySelector('.map__pin--active');
    pinField.removeChild(cardPopup);
    pinActive.classList.remove('map__pin--active');
    renderCard(data[0]);
    event.classList.add('map__pin--active');
  };

  window.closePopup = function () {
    var cardPopup = document.querySelector('.popup');
    var pinActive = document.querySelector('.map__pin--active');

    pinField.removeChild(cardPopup);

    if (document.querySelector('.map__pin--active')) {
      pinActive.classList.remove('map__pin--active');
    }

    window.popupFlag = true;
  };

  pinField.addEventListener('click', function (evt) {
    var target = evt.target;
    var cardData = window.dataPin.slice();
    var filterImage;
    var pinActive = document.querySelector('.map__pin--active');

    if (target.parentElement.type === 'button' && target.parentElement.className === 'map__pin') {
      filterImage = evt.target.getAttribute('src');
      var dataFilter = cardData.filter(function (it) {
        return it.author.avatar === filterImage;
      });

      if (!pinActive) {
        openPopup(target.parentElement, dataFilter);
      } else {
        openNewPopup(dataFilter, target.parentElement);
      }
    }

    if (target.className === 'map__pin' && target.type === 'button') {
      filterImage = evt.target.firstElementChild.getAttribute('src');

      dataFilter = cardData.filter(function (it) {
        return it.author.avatar === filterImage;
      });

      if (!pinActive) {
        renderCard(dataFilter[0]);

        target.classList.add('map__pin--active');
      } else {
        openNewPopup(dataFilter, target);
      }
    }

    if (target.className === 'popup__close') {
      window.closePopup();
    }
  });

  pinField.addEventListener('keydown', function (evt) {
    var ESC_KEYCODE = 27;

    if (evt.keyCode === ESC_KEYCODE) {
      window.closePopup();
    }
  });
})();
