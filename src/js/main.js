ymaps.ready(init);
function init() {
    var myMap = new ymaps.Map("map", {
        center: [55.76963601332982, 37.63668850000002],
        zoom: 13,
        controls: []
    });
    var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
        iconLayout: 'default#image',
        iconImageHref: 'images/Ellipse 2.svg',
        iconImageSize: [12, 12]
    });

    myMap.geoObjects.add(myPlacemark);
}

const searchBtn = document.querySelector('#search-btn');
const search = document.querySelector('.header__search');
const searchSvg = document.querySelector('.header__search_btn_svg');
const closeBtn = document.querySelector('.header__search__close-btn');

searchBtn.addEventListener('click', function () {
    search.classList.add('show');
    searchBtn.classList.add('hide');
})

closeBtn.addEventListener('click', function () {
    search.classList.remove('show');
    searchBtn.classList.remove('hide');
})

const burgerList = document.querySelector('.burger__nav');
const burgerBtn = document.querySelector('.hero__nav__burger');
const burgerBtnSvg = document.querySelector('.hero__nav__burger > svg')

burgerBtn.addEventListener('click', function () {
    burgerList.classList.toggle('hide');
    burgerBtn.classList.toggle('burger__toggle');
    burgerBtnSvg.classList.toggle('hide');
})