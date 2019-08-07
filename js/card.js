'use strict';

(function () {
  var ESC_KEYCODE = 27;
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

    var cardTitle = adCard.querySelector('.popup__title');
    if (data.offer.title) {
      cardTitle.textContent = data.offer.title;
    } else {
      adCard.removeChild(cardTitle);
    }

    var cardAddress = adCard.querySelector('.popup__text--address');
    if (data.offer.address) {
      cardAddress.textContent = data.offer.address;
    } else {
      adCard.removeChild(cardAddress);
    }

    var cardPrice = adCard.querySelector('.popup__text--price');
    if (data.offer.price) {
      cardPrice.textContent = data.offer.price + '₽/ночь';
    } else {
      adCard.removeChild(cardPrice);
    }

    var cardType = adCard.querySelector('.popup__type');
    if (data.offer.type) {
      cardType.textContent = typesMap[data.offer.type];
    } else {
      adCard.removeChild(cardType);
    }

    var cardCapacity = adCard.querySelector('.popup__text--capacity');
    if (data.offer.rooms && data.offer.guests) {
      cardCapacity.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    } else {
      adCard.removeChild(cardCapacity);
    }

    var cardTime = adCard.querySelector('.popup__text--time');
    if (data.offer.checkin && data.offer.checkout) {
      cardTime.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до' + data.offer.checkout;
    } else {
      adCard.removeChild(cardTime);
    }

    var cardDescription = adCard.querySelector('.popup__description');
    if (data.offer.description) {
      cardDescription.textContent = data.offer.description;
    } else {
      adCard.removeChild(cardDescription);
    }

    var cardAvatar = adCard.querySelector('.popup__avatar');
    if (data.author.avatar) {
      cardAvatar.src = data.author.avatar;
    } else {
      adCard.removeChild(cardAvatar);
    }

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

    if (document.querySelector('.popup')) {
      pinField.removeChild(cardPopup);
    }


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
      var dataFilter = cardData.filter(function (item) {
        return item.author.avatar === filterImage;
      });

      if (!pinActive) {
        openPopup(target.parentElement, dataFilter);
      } else {
        openNewPopup(dataFilter, target.parentElement);
      }
    }

    if (target.className === 'map__pin' && target.type === 'button') {
      filterImage = evt.target.firstElementChild.getAttribute('src');

      dataFilter = cardData.filter(function (item) {
        return item.author.avatar === filterImage;
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

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.closePopup();
    }
  });
})();
