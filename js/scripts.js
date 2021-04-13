$(() => {
    // Личный кабинет
    $('.profile .form .change_btn').click(function (e) {
        e.preventDefault()

        let parent = $(this).closest('.line')

        parent.hide().next().css('display', 'flex')
    })

    $('.profile .form .save_btn').click(function (e) {
        e.preventDefault()

        let parent = $(this).closest('.line')

        parent.hide().prev().css('display', 'flex')
    })


    $('.profile .form #ep_check + label').click(function () {
        let _self = $(this)

        setTimeout(() => {
            _self.prev().prop('checked')
                ? $('.profile .form .ep .input').prop('disabled', false)
                : $('.profile .form .ep .input').prop('disabled', true)
        })
    })


    // Календарь
    $('.date_input_inline').datepicker({
        inline: true,
        showOtherMonths: false,
        maxDate: new Date()
    })


    // Оформление заказа
    $('.cart_info .total .checkout_btn').click(function (e) {
        e.preventDefault()

        $('.checkout_info').fadeIn(300)
        $('html, body').stop().animate({ scrollTop: $('.checkout_info').offset().top }, 750)
    })

    $('.checkout_info .form #ep_check + label').click(function () {
        let _self = $(this)

        setTimeout(() => {
            _self.prev().prop('checked')
                ? $('.checkout_info .form .ep .input').prop('disabled', false)
                : $('.checkout_info .form .ep .input').prop('disabled', true)
        })
    })


    // Страница товара
    if ($('.product_info .images').length) {
        const productSlider = new Swiper('.product_info .big .swiper-container', {
            loop: false,
            speed: 500,
            watchSlidesVisibility: true,
            slideActiveClass: 'active',
            slideVisibleClass: 'visible',
            spaceBetween: 0,
            slidesPerView: 1,
            on: {
                slideChange: swiper => {
                    console.log(swiper)
                    setTimeout(() => {
                        $('.product_info .images .thumbs button').removeClass('active')
                        $('.product_info .images .thumbs button').eq(swiper.activeIndex).addClass('active')
                    })
                }
            }
        })

        $('.product_info .images .thumbs button').click(function (e) {
            e.preventDefault()

            productSlider.slideTo($(this).data('slide-index'), 500)
        })
    }


    // Сортировка товаров
    $('.products .head .sort .btn').click(function (e) {
        e.preventDefault()

        $(this).hasClass('up')
            ? $(this).removeClass('up').addClass('down')
            : $(this).removeClass('down').addClass('up')
    })


    // Изменение вида отображения товаров
    $('.products .head .view .btn_list').click(function (e) {
        e.preventDefault()

        $('.products .head .view button').removeClass('active')
        $(this).addClass('active')

        $('.products .row').addClass('list').removeClass('row')

        $('.products .product .name').height('auto')
    })

    $('.products .head .view .btn_grid').click(function (e) {
        e.preventDefault()

        $('.products .head .view button').removeClass('active')
        $(this).addClass('active')

        $('.products .list').addClass('row').removeClass('list')

        // Выравнивание элементов в сетке
        $('.products .row').each(function () {
            productHeight($(this), parseInt($(this).css('--products_count')))
        })
    })


    // Кастомный скролл
    if ($(window).width() > 1023) {
        $('.custom_scrollbar').mCustomScrollbar({
            scrollButtons: false,
            scrollInertia: 300,
            mouseWheel: { scrollAmount: 100 }
        })
    }
})



$(window).on('load', () => {
    // Выравнивание элементов в сетке
    $('.products .row').each(function () {
        productHeight($(this), parseInt($(this).css('--products_count')))
    })


    // Изменение вида отображения товаров
    if ($(window).width() < 1024) {
        $('.products .list').addClass('row').removeClass('list')

        // Выравнивание элементов в сетке
        $('.products .row').each(function () {
            productHeight($(this), parseInt($(this).css('--products_count')))
        })
    }
})



$(window).resize(() => {
    // Выравнивание элементов в сетке
    $('.products .row').each(function () {
        productHeight($(this), parseInt($(this).css('--products_count')))
    })


    // Изменение вида отображения товаров
    if ($(window).width() < 1024) {
        $('.products .list').addClass('row').removeClass('list')

        // Выравнивание элементов в сетке
        $('.products .row').each(function () {
            productHeight($(this), parseInt($(this).css('--products_count')))
        })
    }
})



// Выравнивание товаров
function productHeight(context, step) {
    let start = 0,
        finish = step,
        $products = context.find('.product')

    $products.find('.name').height('auto')

    $products.each(function () {
        setHeight($products.slice(start, finish).find('.name'))

        start = start + step
        finish = finish + step
    })
}