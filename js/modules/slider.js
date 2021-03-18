function slider({nextSlide, prevSlide, slider, slideElem, currentCounters, totalCounters, wrapper, slideInner}) {
    //Slider
 
    const offerSliderNext = document.querySelector(nextSlide),
          offerSlider = document.querySelector(slider),
          offerSliderPrev = document.querySelector(prevSlide),
          offerSlideElems = document.querySelectorAll(slideElem),
          currentElem = document.querySelector(currentCounters),
          totalElem = document.querySelector(totalCounters),
          offerSliderWrapper = document.querySelector(wrapper),
          offerSliderInner = document.querySelector(slideInner),
          width = window.getComputedStyle(offerSliderWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if(offerSlideElems.length < 10) {
        totalElem.textContent = `0${offerSlideElems.length}`;
        currentElem.textContent = `0${slideIndex}`;
    }else {
        totalElem.textContent = offerSlideElems.length;
        currentElem.textContent = slideIndex;
    }

    offerSliderInner.style.width = 100 * offerSlideElems.length + '%';
    offerSliderInner.style.display = 'flex';
    offerSliderInner.style.transition = '0.5s all';

    offerSliderWrapper.style.overflow = 'hidden';

    offerSlideElems.forEach(slide => {
        slide.style.width = width;
    });

    offerSlider.style.position = 'relative';

    const dots = document.createElement('ol'),
          arrayDot = [];
    dots.classList.add('carousel-indicators');

    offerSlider.append(dots);

    for(let i = 0; i < offerSlideElems.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        dots.append(dot);
        if(i == 0) {
            dot.style.opacity = '1';
        }
        arrayDot.push(dot);
    }
    
    offerSliderNext.addEventListener('click', () => {
        if(offset == +width.replace(/\D/g, '') * (offerSlideElems.length - 1)) {
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
        }
        styleTransform ();

        if(slideIndex == offerSlideElems.length) {
            slideIndex = 1;
        }else {
            slideIndex++;
        }
        
        insertZero();
        styleOpacity();
    });

    offerSliderPrev.addEventListener('click', () => {
        if(offset == 0) {
            changeOffset(offerSlideElems.length);
        } else {
            offset -= +width.replace(/\D/g, '');
        }
        styleTransform ();

        if(slideIndex == 1) {
            slideIndex = offerSlideElems.length;
        }else {
            slideIndex--;
        }
        
        insertZero();
        styleOpacity();
    });

    arrayDot.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            
            changeOffset(slideTo);
            styleTransform ();

            insertZero();
            styleOpacity();
        });
    });

    function insertZero() {
        if(offerSlideElems.length < 10) {
            currentElem.textContent = `0${slideIndex}`;
        }else {
            currentElem.textContent = slideIndex;
        }
    }

    function styleOpacity() {
        arrayDot.forEach(dot => dot.style.opacity = '0.5');
        arrayDot[slideIndex - 1].style.opacity = '1';
    }

    function styleTransform () {
        offerSliderInner.style.transform = `translateX(-${offset}px)`;
    }

    function changeOffset(slider) {
        offset = +width.replace(/\D/g, '') * (slider - 1);
    }
}

export default slider;