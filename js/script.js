    
    import calc from './modules/calc';
    import cards from './modules/cards';
    import forms from './modules/forms';
    import modal from './modules/modal';
    import slider from './modules/slider';
    import tabs from './modules/tabs';
    import timer from './modules/timer';
    import {openModal} from './modules/modal';


window.addEventListener('DOMContentLoaded', function() {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);
    calc();
    cards();
    forms('form', modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    slider({
        slideElem: '.offer__slide',
        totalCounters: '#total',
        nextSlide: '.offer__slider-next',
        prevSlide: '.offer__slider-prev',
        slider: '.offer__slider',
        slideInner: '.offer__slider-inner',
        currentCounters: '#current',     
        wrapper: '.offer__slider-wrapper',  
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2021-04-18');
});