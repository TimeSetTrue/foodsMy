function calc() {
    //Calc

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    }else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    }else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(item => {
            item.classList.remove(activeClass);
            if(item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add(activeClass);
            }
            if(item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                item.classList.add(activeClass);
            }
        });
    }

    function calcTotal() {
        if(!sex || !height || !weight || !age || !ratio) {
            result.textContent = '_____';
            return;
        }

        if(sex == 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function getStaticInformation(selector, activeClass) {
        const element = document.querySelectorAll(selector);

        element.forEach(item => {
            item.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                }else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                element.forEach(item => {
                    item.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            }else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
    
    // showSlides(slideIndex);

    // if(offerSlideElems.length < 10) {
    //     totalElem.textContent = `0${offerSlideElems.length}`;
    // }else {
    //     totalElem.textContent = offerSlideElems.length;
    // }

    // function showSlides(n) {
    //     if(n > offerSlideElems.length) {
    //         slideIndex = 1;
    //     }

    //     if(n < 1) {
    //         slideIndex = offerSlideElems.length;
    //     }

    //     if(offerSlideElems.length < 10) {
    //         currentElem.textContent = `0${slideIndex}`;
    //     }else {
    //         currentElem.textContent = slideIndex;
    //     }

    //     offerSlideElems.forEach(item => item.style.display = 'none');
    //     offerSlideElems[slideIndex - 1].style.display = 'block';   
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // offerSliderPrev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });
    // offerSliderNext.addEventListener('click', () => {
    //     plusSlides(1);
    // });
}

export default calc;