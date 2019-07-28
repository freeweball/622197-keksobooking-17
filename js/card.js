'use strict';

(function () {

  var typesMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var renderAdFeatures = function (ad, featuresNode) {
    var currentFeatures = ad['offer']['features'];
    var featuresArray = [].slice.call(featuresNode.children);

    featuresArray.forEach(function (item, index) {
      if (index >= currentFeatures.length) {
        featuresNode.removeChild(item);
      }

      item.textContent = currentFeatures[index];
    });
  };

  var renderAdPhotos = function (ad, photosNode) {
    var currentPhotos = ad['offer']['photos'];
    var currentAdPhoto = photosNode.children[0];
    photosNode.innerHTML = '';
    var photosFragment = document.createDocumentFragment();

    currentPhotos.forEach(function (item, index) {
      var tempAdPhoto = currentAdPhoto.cloneNode(true);

      tempAdPhoto.src = currentPhotos[index];
      photosFragment.appendChild(tempAdPhoto);
    });

    photosNode.appendChild(photosFragment);
  };

  var getCard = function (ad) {
    var cardBlock = document.querySelector('#card').content.querySelector('.map__card');
    var adCard = cardBlock.cloneNode(true);

    adCard.querySelector('.popup__title').textContent = ad['offer']['title'];
    adCard.querySelector('.popup__text--address').textContent = ad['offer']['address'];
    adCard.querySelector('.popup__text--price').textContent = ad['offer']['price'] + '₽/ночь';
    adCard.querySelector('.popup__type').textContent = typesMap[ad['offer']['type']];
    adCard.querySelector('.popup__text--capacity').textContent = ad['offer']['rooms'] + ' комнаты для '
    + ad['offer']['guests'] + ' гостей';
    adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad['offer']['checkin']
    + ', выезд до' + ad['offer']['checkout'];
    adCard.querySelector('.popup__description').textContent = ad['offer']['description'];
    adCard.querySelector('.popup__avatar').src = ad['author']['avatar'];

    var adCardFeatures = adCard.querySelector('.popup__features');
    if (ad['offer']['features'].length) {
      renderAdFeatures(window.dataPin[1], adCardFeatures);
    } else {
      adCard.removeChild(adCardFeatures);
    }

    var adCardPhotos = adCard.querySelector('.popup__photos');
    if (ad['offer']['photos'].length) {
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
    var buttonHeight = (evt.target.height === 40);
    var buttonType = (evt.target.type === 'button');

    if (buttonHeight || buttonType) {
      renderCard();
    }
  });
})();
