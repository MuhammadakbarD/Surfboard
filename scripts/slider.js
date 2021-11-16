const slider = $('.products').bxSlider({
    pager: false,
    controls: false
});

$('.products-slider__arrow--direction--prev').click(e => {
    e.preventDefault();
    slider.goToPrevSlide();
})

$('.products-slider__arrow--direction--next').click(e => {
    e.preventDefault();
    slider.goToNextSlide();
})