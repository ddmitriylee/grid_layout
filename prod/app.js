"use strict";function init(){var e=new ymaps.Map("map",{center:[55.76963601332982,37.63668850000002],zoom:13,controls:[]}),r=new ymaps.Placemark(e.getCenter(),{},{iconLayout:"default#image",iconImageHref:"images/Ellipse 2.svg",iconImageSize:[12,12]});e.geoObjects.add(r)}ymaps.ready(init);var searchBtn=document.querySelector("#search-btn"),search=document.querySelector(".header__search"),searchSvg=document.querySelector(".header__search_btn_svg"),closeBtn=document.querySelector(".header__search__close-btn");searchBtn.addEventListener("click",(function(){search.classList.add("show"),searchBtn.classList.add("hide")})),closeBtn.addEventListener("click",(function(){search.classList.remove("show"),searchBtn.classList.remove("hide")}));var burgerList=document.querySelector(".burger__nav"),burgerBtn=document.querySelector(".hero__nav__burger"),burgerBtnSvg=document.querySelector(".hero__nav__burger > svg");burgerBtn.addEventListener("click",(function(){burgerList.classList.toggle("hide"),burgerBtn.classList.toggle("burger__toggle"),burgerBtnSvg.classList.toggle("hide")}));