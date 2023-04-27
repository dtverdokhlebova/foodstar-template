/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', function () {
  uiDatepicker()
  uiRange()
  uiSelects()
  events()
  bannersList()
  basket()
  brands()
  counter()
  headerScripts()
  headerLkScripts()
  formRegistration()
  footer()
  inputMask()
  ordersList()
  noticeAdded()
  popup()
  productCatalog()
  productItem()
  productView()
  productGridSlider()
  productSlider()
  tabs()
  validation()
  wishlistButton()
})

window.addEventListener('load', function () {
  map()
})

function toString(line) {
  return Number.parseInt(line, 10).toString().replace(/(\d{1,3}(?=(?:\d{3})+(?!\d)))/g, '$1 ')
}

function isOverflown(element) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth
}

function uiDatepicker() {
  const defaultSettings = {
    locale: 'ru',
    dateFormat: 'd.m.Y',
    disableMobile: 'true',
    position: 'auto left'
  }

  const datepickersRange = document.querySelectorAll('.ui-datepicker--range')
  const datepickersRangeMobInline = document.querySelectorAll('.ui-datepicker--range-mob-inline')
  for (const datepicker of datepickersRange) {
    const datepickerRange = datepicker.querySelector('input')
    const endInput = datepickerRange.dataset.inputEnd
    flatpickr(datepickerRange, Object.assign({}, defaultSettings, {
      // eslint-disable-next-line new-cap
      plugins: [new rangePlugin({ input: endInput })]
    }))
  }
  for (const datepicker of datepickersRangeMobInline) {
    const datepickerRange = datepicker.querySelector('input')
    const endInput = datepickerRange.dataset.inputEnd
    flatpickr(datepickerRange, Object.assign({}, defaultSettings, {
      // eslint-disable-next-line new-cap
      plugins: [new rangePlugin({ input: endInput })],
      inline: !(window.innerWidth > 767)
    }))
  }
}

function uiRange() {
  const ranges = document.querySelectorAll('.ui-range')

  for (const range of ranges) {
    const itemRange = range.querySelector('.ui-range__native')
    const minInp = Number.parseInt(range.dataset.min, 10)
    const maxInp = Number.parseInt(range.dataset.max, 10)
    const startTopInp = Number.parseInt(range.dataset.startTop, 10)
    const startBotInp = Number.parseInt(range.dataset.startBot, 10)
    const topValue = range.querySelector('.ui-range__lower')
    const botValue = range.querySelector('.ui-range__upper')

    noUiSlider.create(itemRange, {
      start: [startTopInp, startBotInp],
      connect: true,
      range: {
        min: minInp,
        max: maxInp
      }
    })

    itemRange.noUiSlider.on('update', function () {
      const [top, bot] = itemRange.noUiSlider.get()
      topValue.value = toString(top)
      botValue.value = toString(bot)
    })

    topValue.addEventListener('change', function () {
      itemRange.noUiSlider.set(+(this.value).replace(/\s/g, ''))
    })
    botValue.addEventListener('change', function () {
      itemRange.noUiSlider.set([null, (this.value).replace(/\s/g, '')])
    })
  }
}

function uiSelects() {
  const selects = document.querySelectorAll('.ui-select select')
  for (const select of selects) {
    const selectParent = select.parentElement
    $(select).select2({
      minimumResultsForSearch: Number.POSITIVE_INFINITY,
      width: 'auto',
      dropdownAutoWidth: true,
      dropdownParent: selectParent,
      placeholder: select.dataset.placeholder === undefined ? '' : select.dataset.placeholder
    })
  }

  $('.ui-select select').on('select2:closing', function () {
    const parent = this.parentElement
    const placeholderLength = parent.querySelectorAll('.select2-selection__placeholder').length
    placeholderLength > 0 ? parent.classList.remove('filled') : parent.classList.add('filled')
  })
}

function wishlistButton() {
  $(document).on('click', '.wishlist-button__icon', function () {
    $(this).parents('.wishlist-button').toggleClass('active')
  })

  const tooltips = document.querySelectorAll('.wishlist-button__icon')
  tippy(tooltips, {
    content(reference) {
      const content = reference.nextElementSibling
      return content.innerHTML
    },
    allowHTML: true,
    trigger: 'mouseenter focus',
    theme: 'wishlist-tooltip',
    maxWidth: 300
  })
}

function map() {
  if (document.querySelector('#contactsMap')) {
    ymaps.ready(mapInit)
  }
}

function mapInit() {
  const mapIconImageSize = window.innerWidth > 767 ? [74, 85] : [53, 62]
  const mapIconImageOffset = window.innerWidth > 767 ? [-38, -42] : [-26, -30]

  const myMap = new ymaps.Map('contactsMap', {
    // eslint-disable-next-line unicorn/numeric-separators-style
    center: [51.34314, 37.851592],
    zoom: 13,
    controls: []
  }, {
    suppressMapOpenBlock: true
  })
  // eslint-disable-next-line unicorn/numeric-separators-style
  const placemark = new ymaps.Placemark([51.34314, 37.851592], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/map_logo.svg',
    iconImageSize: mapIconImageSize,
    iconImageOffset: mapIconImageOffset
  })

  myMap.geoObjects.add(placemark)
  if (window.innerWidth < 1025) {
    myMap.behaviors.disable('drag')
    myMap.behaviors.disable('scrollZoom')
  }
}

function bannersList() {
  const bannersListSlider = new Swiper(document.querySelector('.banners-list .swiper'), {
    spaceBetween: 20,
    slidesPerView: 1,
    loop: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.banners-list .swiper-button-next',
      prevEl: '.banners-list .swiper-button-prev'
    },
    breakpoints: {
      767: {
        slidesPerView: 2,
        loop: false
      }
    }
  })
}

function brands() {
  const brandsSlider = new Swiper(document.querySelector('.brands .swiper'), {
    spaceBetween: 10,
    slidesPerView: 'auto',
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      767: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  })
}

function counter() {
  $(document).on('click', '.counter__btn', function () {
    const isNegative = $(this).hasClass('counter__btn--minus')
    const input = $(this).siblings('.counter__input')
    input[0][isNegative ? 'stepDown' : 'stepUp']()
  })
}

function productItem() {
  $(document).on('click', '.product-item__ui-button', function () {
    $(this).parents('.product-item__actions').addClass('product-item__actions--in-basket')
  })
}

function productGridSlider() {
  const items4slides = document.querySelectorAll('.product-grid--4slider .swiper')
  const items3slides = document.querySelectorAll('.product-grid--3slider .swiper')
  for (const item of items4slides) {
    const slider = new Swiper(item, {
      spaceBetween: 15,
      slidesPerView: 'auto',
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        767: {
          spaceBetween: 10
        },
        1360: {
          spaceBetween: 20
        }
      }
    })
  }
  for (const item of items3slides) {
    const slider = new Swiper(item, {
      spaceBetween: 10,
      slidesPerView: 'auto',
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        767: {
          spaceBetween: 20,
          slidesPerView: 3
        }
      }
    })
  }
}

function productView() {
  if (document.querySelectorAll('.product-view-nav__item').length > 0) {
    const navItems = document.querySelectorAll('.product-view-nav__item')
    const navMain = document.querySelector('.product-view-main')
    const productItems = navMain.querySelectorAll('.product-item')
    const productGrid = navMain.querySelector('.product-grid')
    const productHead = document.querySelector('.product-head')

    for (const item of navItems) {
      item.addEventListener('click', function () {
        const viewType = this.dataset.type
        for (const itemNav of navItems) {
          itemNav.classList.remove('active')
        }
        for (const itemProduct of productItems) {
          itemProduct.className = `product-item product-item--${viewType}`
        }
        this.classList.add('active')
        productGrid.className = `product-grid product-grid--${viewType}`
        viewType === 'table' ? productHead.classList.add('active') : productHead.classList.remove('active')
      })
    }
  }
}

function productSlider() {
  const sliderThumbs = new Swiper('.product-slider__thumbs .swiper', {
    spaceBetween: 8,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.product-slider__thumbs .swiper-button-next',
      prevEl: '.product-slider__thumbs .swiper-button-prev'
    }
  })
  const sliderMain = new Swiper('.product-slider__main .swiper', {
    spaceBetween: 10,
    thumbs: {
      swiper: sliderThumbs
    }
  })
}

function productCatalog() {
  if (document.querySelectorAll('.product-filter').length > 0) {
    const openButton = document.querySelector('.product-open-filter__button')
    const filter = document.querySelector('.product-filter')
    const closeButtons = filter.querySelectorAll('.js-product-filter-close')
    const isDesktop = !window.matchMedia('(max-width: 1360px)').matches
    openButton.addEventListener('click', function () {
      filter.classList.add('active')
      document.documentElement.classList.add('ov-hidden')
    })
    for (const button of closeButtons) {
      button.addEventListener('click', function () {
        filter.classList.remove('active')
        document.documentElement.classList.remove('ov-hidden')
      })
    }
    if (isDesktop) {
      window.addEventListener('scroll', function () {
        filterScroll()
      })
    }
    filterPosition()
    window.addEventListener('scroll', function () {
      filterPosition()
    })
  }
}

function filterPosition() {
  const parent = document.querySelector('.product-catalog')
  const topPosition = parent.getBoundingClientRect().top
  document.documentElement.style.setProperty('--product-filter-top', `${topPosition}px`)
}

function filterScroll() {
  const filter = $('.product-filter')
  const filterLine = $('.product-catalog__auxiliary')
  const filterLineTop = filterLine.offset().top
  const filterLineHeight = filterLine.innerHeight()
  const filterLineBot = filterLineTop + filterLineHeight
  const filterTop = filter.offset().top
  const filterHeight = filter.innerHeight()
  const filterBot = filterTop + filterHeight

  if ((filterLineBot - filterLineTop) < (filterBot - filterTop)) {
    const topPos = filterLineTop - $('.product-catalog__main').offset().top
    const botPos = topPos + filterLineHeight
    const heirz = botPos - filterHeight
    if (filterLineBot >= filterBot) {
      filter.css('transform', `translate(0px, ${heirz}px)`)
    }
    if (filterTop >= filterLineTop) {
      filter.css('transform', `translate(0px, ${topPos}px)`)
    }
  }
}

function tabs() {
  const tabHeadBlocks = document.querySelectorAll('.tabs-head')
  for (const item of tabHeadBlocks) {
    const itemGroup = item.dataset.group
    const headItems = item.querySelectorAll('.tabs-head__item')
    const bodyData = document.querySelectorAll(`.tabs-body[data-group='${itemGroup}']`)
    for (const [index, button] of headItems.entries()) {
      button.addEventListener('click', (event) => {
        for (const head of headItems) {
          head.classList.remove('active')
        }
        event.currentTarget.classList.add('active')
        if (bodyData.length > 0) {
          for (const body of bodyData) {
            const bodyItems = body.children
            for (const itemBody of bodyItems) {
              itemBody.classList.remove('active')
            }
            bodyItems[index].classList.add('active')
          }
        }
      })
    }
  }

  const tabHeadAsideBlocks = document.querySelectorAll('.tabs-head--aside')
  for (const item of tabHeadAsideBlocks) {
    const selectButton = item.querySelector('.tabs-head__select')
    const tabsItems = item.querySelectorAll('.tabs-head__item')

    selectButton.addEventListener('click', () => item.classList.toggle('open'))

    for (const tab of tabsItems) {
      tab.addEventListener('click', function () {
        selectButton.children[0].innerHTML = this.children[0].innerHTML
        item.classList.remove('open')
      })
    }

    document.addEventListener('click', (event) => {
      const withinBoundaries = event.composedPath().includes(item)
      if (!withinBoundaries) item.classList.remove('open')
    })
  }
}

function headerScripts() {
  const header = document.querySelector('.header')
  if (header) {
    headerHeightCalc()

    const headerSearch = document.querySelector('.header__search')
    const headerSearchInput = headerSearch.querySelector('.search__input')
    const headerShadow = document.querySelector('.header__shadow')
    const headerMainItem = document.querySelector('.header__main-item')
    const isNotMobile = !window.matchMedia('(max-width: 767px)').matches

    headerSearchInput.addEventListener('input', function () {
      this.value ? headerSearch.classList.add('search--input') : headerSearch.classList.remove('search--input')
    })
    headerSearchInput.addEventListener('focus', function () {
      headerShadow.classList.add('active')
      headerMainItem.classList.add('header__main-item--open-search')
      document.documentElement.classList.add('ov-hidden')
    })
    headerSearchInput.addEventListener('focusout', function () {
      if (!this.value) {
        headerShadow.classList.remove('active')
        headerMainItem.classList.remove('header__main-item--open-search')
        document.documentElement.classList.remove('ov-hidden')
      }
    })
    headerShadow.addEventListener('click', function () {
      headerShadow.classList.remove('active')
      headerSearch.classList.remove('search--input')
      document.documentElement.classList.remove('ov-hidden')
    })

    window.addEventListener('load', function () {
      setTimeout(() => {
        headerHeightScrollCalc()
      }, 300)
    })
    window.addEventListener('resize', function () {
      headerHeightCalc()
    })
    window.addEventListener('scroll', function () {
      headerHeightScrollCalc()
    })

    if (isNotMobile) {
      window.addEventListener('scroll', function () {
        const scrollValue = $(window).scrollTop()
        scrollValue > 60 ? header.classList.add('header--scroll') : header.classList.remove('header--scroll')
      })
    }
    const catalogOpenButton = document.querySelector('.header__ui-button')
    const catalogNavButtons = document.querySelectorAll('.header-catalog__button')
    const catalogMainItems = document.querySelectorAll('.header-catalog__item')
    const headerCatalog = document.querySelector('.header-catalog')
    const headerCatalogClose = document.querySelector('.header-catalog__nav .header-catalog__close')
    const headerBurgerActiveClass = 'ui-button--burger-active'
    const headerCatalogContent = document.querySelector('.header-catalog__content')
    const headerCatalogContentClose = document.querySelector('.header-catalog__content .header-catalog__close')
    catalogOpenButton.addEventListener('click', function () {
      const headerHeight = header.offsetHeight

      this.classList.toggle(headerBurgerActiveClass)
      headerCatalog.classList.toggle('active')
      document.documentElement.classList.toggle('ov-hidden')
      if (this.classList.contains(headerBurgerActiveClass)) {
        document.documentElement.style.setProperty('--header-height-for-catalog', `${headerHeight}px`)
      }
    })
    headerCatalogClose.addEventListener('click', function () {
      catalogOpenButton.classList.remove(headerBurgerActiveClass)
      headerCatalog.classList.remove('active')
      document.documentElement.classList.remove('ov-hidden')
    })
    headerCatalogContentClose.addEventListener('click', function () {
      headerCatalogContent.classList.remove('active')
    })
    for (const [index, item] of catalogNavButtons.entries()) {
      item.addEventListener('click', function () {
        for (const itemButton of catalogNavButtons) {
          itemButton.classList.remove('active')
        }
        for (const itemMain of catalogMainItems) {
          itemMain.classList.remove('active')
        }
        this.classList.add('active')
        catalogMainItems[index].classList.add('active')
        headerCatalogContent.classList.add('active')
      })
    }

    const burgerButton = document.querySelector('.header__burger-btn')
    const burgerBlock = document.querySelector('.header-burger')
    const burgerClose = document.querySelector('.header-burger__close')
    burgerButton.addEventListener('click', function () {
      burgerBlock.classList.add('active')
      document.documentElement.classList.add('ov-hidden')
    })
    burgerClose.addEventListener('click', function () {
      burgerBlock.classList.remove('active')
      document.documentElement.classList.remove('ov-hidden')
    })
  }
}

function headerHeightCalc() {
  const headerHeight = document.querySelector('.header').offsetHeight
  document.documentElement.style.setProperty('--header-height', `${headerHeight}px`)
}

function headerHeightScrollCalc() {
  const headerHeight = document.querySelector('.header').offsetHeight
  document.documentElement.style.setProperty('--header-height-scroll', `${headerHeight}px`)
}

function headerLkScripts() {
  const header = document.querySelector('.header-lk')
  if (header) {
    const burgerButton = document.querySelector('.header-lk__burger-btn')
    const navbar = document.querySelector('.navbar')
    const navbarClose = document.querySelector('.navbar__close')
    burgerButton.addEventListener('click', function () {
      navbar.classList.add('navbar--open')
      document.documentElement.classList.add('ov-hidden')
    })
    navbarClose.addEventListener('click', function () {
      navbar.classList.remove('navbar--open')
      document.documentElement.classList.remove('ov-hidden')
    })
  }
}

function footer() {
  footerBrands()

  $('.footer__to-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600)
    return false
  })

  window.addEventListener('resize', function () {
    footerBrands()
  })
}

function footerBrands() {
  const items = document.querySelectorAll('.footer__brands-item')

  for (const item of items) {
    item.classList.remove('footer__brands-item--stuffed')
    if (isOverflown(item)) {
      item.classList.add('footer__brands-item--stuffed')
    }
  }
}

function validation() {
  $('form').parsley()
  window.Parsley.addValidator('phone', {
    validateString: function (value) {
      return /^\+7 \(9\d{2}\) \d{3}-\d{2}-\d{2}$/.test(value)
    }
  })
  window.Parsley.addValidator('inn', {
    validateString: function (value) {
      return /^\d{10}$|^\d{12}$/.test(value)
    }
  })
  window.Parsley.addValidator('ogrn', {
    validateString: function (value) {
      return /^\d{13}$|^\d{15}$/.test(value)
    }
  })
}

function formRegistration() {
  const form = $('.form--registration')
  const steps = form.find('.form-step')
  const stepCurrentClass = 'form-step--current'
  const buttonPrevious = form.find('.form-button-previous')
  const buttonNext = form.find('.form-button-next')

  function navigateTo(index) {
    const progressItem = form.find('.form-progress__item')

    steps
      .removeClass(stepCurrentClass)
      .eq(index).addClass(stepCurrentClass)

    progressItem.removeClass('form-progress__item--current form-progress__item--prev')
    progressItem.eq(index).addClass('form-progress__item--current')
    for (let progressIndex = 0; progressIndex < index; progressIndex++) {
      progressItem.eq(progressIndex).addClass('form-progress__item--prev')
    }
  }

  function currentIndex() {
    return steps.index(steps.filter('.form-step--current'))
  }

  buttonPrevious.click(function () {
    navigateTo(currentIndex() - 1)
  })

  buttonNext.click(function () {
    $('.form--registration').parsley().whenValidate({
      group: `block-${currentIndex()}`
    }).done(function () {
      navigateTo(currentIndex() + 1)
    })
  })

  // Prepare sections by setting the `data-parsley-group` attribute to 'block-0', 'block-1', etc.
  steps.each(function (index, section) {
    $(section).find(':input').attr('data-parsley-group', `block-${index}`)
  })
  navigateTo(0)
}

function inputMask() {
  Inputmask({
    mask: '+7 (\\999) 999-99-99',
    showMaskOnHover: false
  }).mask('[data-mask=phone]')
  Inputmask({
    mask: '9',
    repeat: 12
  }).mask('[data-mask=inn]')
}

function basket() {
  const basketAll = document.querySelector('.basket-head__ui-checkbox input')
  const basketItems = document.querySelectorAll('.basket-item__ui-checkbox input')

  if (basketItems.length > 0) {
    basketAll.addEventListener('change', function () {
      if (this.checked) {
        for (const item of basketItems) {
          item.checked = true
        }
      } else {
        for (const item of basketItems) {
          item.checked = false
        }
      }
    })

    for (const item of basketItems) {
      item.addEventListener('change', function () {
        basketAll.checked = false
      })
    }
  }
}

function noticeAdded() {
  $(document).on('click', '.js-open-notice-added', function () {
    $('.notice-added').addClass('active')
    setTimeout(() => {
      $('.notice-added').removeClass('active')
    }, 5000)
  })
}

function popup() {
  window.Fancybox = Fancybox

  Fancybox.defaults.ScrollLock = false

  window.winGetPopup = function (element) {
    getPopup(element)
  }

  $('.js-close-popup').on('click', function () {
    Fancybox.close(true)
  })

  const popupOpenButton = document.querySelectorAll('.js-open-popup')
  for (const button of popupOpenButton) {
    if ($(button).length > 0) {
      button.addEventListener('click', (event) => {
        event.preventDefault()
        const popopUrl = button.getAttribute('href')
        getPopup(popopUrl)
      })
    }
  }
}

function getPopup(url) {
  const popupUrl = url
  Fancybox.show(
    [
      {
        src: popupUrl,
        preload: false
      }
    ],
    {
      mainClass: 'popup',
      parentEl: document.querySelector('.wrapper'),
      closeButton: false,
      showClass: 'fancybox-fadeIn',
      hideClass: 'fancybox-fadeOut',
      hideScrollbar: true,
      autoFocus: true,
      trapFocus: true,
      dragToClose: false,
      animated: false
    }
  )
}

function ordersList() {
  const ordersListSlider = new Swiper('.orders-list .swiper', {
    spaceBetween: 10,
    slidesPerView: 'auto',
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      767: {
        spaceBetween: 20
      }
    }
  })
}

function events() {
  $('.events__head').on('click', function () {
    $(this).toggleClass('events__head--active')
    $(this).siblings('.events__main').slideToggle()
  })
}
