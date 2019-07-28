'use strict';

(function () {

  var typesMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var renderAdFeatures = function (data, featuresNode) {
    var currentFeatures = data.offer.features;
    var featuresArray = [].slice.call(featuresNode.children);

    featuresArray.forEach(function (item, index) {
      if (index >= currentFeatures.length) {
        featuresNode.removeChild(item);
      }

      item.textContent = currentFeatures[index];
    });
  };

  var renderAdPhotos = function (data, photosNode) {
    var currentPhotos = data.offer.photos;
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
      renderAdFeatures(window.dataPin[1], adCardFeatures);
    } else {
      adCard.removeChild(adCardFeatures);
    }

    var adCardPhotos = adCard.querySelector('.popup__photos');
    if (data.offer.photos.length) {
      renderAdPhotos(window.dataPin[1], adCardPhotos);
    } else {
      adCard.removeChild(adCardPhotos);
    }

    return adCard;
  };

  var renderCard = function () {
    var cardList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    fragment.appendChild(getCard(window.dataPin[1]));
    cardList.appendChild(fragment);
  };

  var pinButton = document.querySelector('.map__pins');

  pinButton.addEventListener('click', function (evt) {
    if (evt.target.type === 'button') {
      renderCard();
    }
  });
})();
