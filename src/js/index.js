document.addEventListener('DOMContentLoaded', function () {
  uiRange()
  uiSelects()
  bannersList()
  brands()
  counter()
  headerScripts()
  // headerHeightCalc()
  footer()
  productCatalog()
  productItem()
  productView()
  productGridSlider()
  productSlider()
  tabs()
  validation()
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

function uiRange() {
  const ranges = document.querySelectorAll('.ui-range')

  for (const range of ranges) {
    const itemRange = range.querySelector('.ui-range__native')
    const minInp = Number.parseInt(range.dataset.min, 10)
    const maxInp = Number.parseInt(range.dataset.max, 10)
    const startTopInp = Number.parseInt(range.dataset.startTop, 10)
    const startBotInp = Number.parseInt(range.dataset.startBot, 10)

    noUiSlider.create(itemRange, {
      start: [startTopInp, startBotInp],
      connect: true,
      range: {
        min: minInp,
        max: maxInp
      }
    })

    const topValue = range.querySelector('.ui-range__lower')
    const botValue = range.querySelector('.ui-range__upper')

    itemRange.noUiSlider.on('update', function () {
      const [top, bot] = itemRange.noUiSlider.get()
      topValue.value = toString(top)
      botValue.value = toString(bot)
    })

    // topValue.addEventListener('change', function () {
    //   itemRange.noUiSlider.set(+(this.value).replace(/\s/g, ''))
    // })
    // botValue.addEventListener('change', function () {
    //   itemRange.noUiSlider.range.max(+(this.value).replace(/\s/g, ''))
    // })
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
    center: [51.34314, 37.851592],
    zoom: 13,
    controls: []
  }, {
    suppressMapOpenBlock: true
  })
  const placemark = new ymaps.Placemark([51.34314, 37.851592], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/map_logo.svg',
    iconImageSize: mapIconImageSize,
    iconImageOffset: mapIconImageOffset
  })

  myMap.geoObjects.add(placemark)
  if (window.innerWidth < 1025) {
    myMap.behaviors.disable('drag')
    // myMap.behaviors.disable('scrollZoom')
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
  $('.counter__btn').on('click', function () {
    const isNegative = $(this).hasClass('counter__btn--minus')
    const input = $(this).siblings('.counter__input')
    input[0][isNegative ? 'stepDown' : 'stepUp']()
  })
}

function productItem() {
  $('.product-item__ui-button').on('click', function () {
    $(this).parents('.product-item__actions').addClass('product-item__actions--in-basket')
  })
}

function productGridSlider() {
  const items = document.querySelectorAll('.product-grid--4slider .swiper')
  for (const item of items) {
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
}

function productView() {
  if (document.querySelectorAll('.product-view-nav__item').length > 0) {
    const navItems = document.querySelectorAll('.product-view-nav__item')
    const navMain = document.querySelector('.product-view-main')
    const productItems = navMain.querySelectorAll('.product-item')
    const productGrid = navMain.querySelector('.product-grid')

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
    const closeButton = filter.querySelector('.product-filter__btn')
    openButton.addEventListener('click', function () {
      filter.classList.add('active')
    })
    closeButton.addEventListener('click', function () {
      filter.classList.remove('active')
    })
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
  headerHeightCalc()

  const header = document.querySelector('.header')
  const headerSearch = document.querySelector('.header__search')
  const headerSearchInput = headerSearch.querySelector('.search__input')
  const headerShadow = document.querySelector('.header__shadow')
  const isNotMobile = !window.matchMedia('(max-width: 767px)').matches

  if (isNotMobile) {
    window.addEventListener('scroll', function () {
      const scrollValue = $(window).scrollTop()
      scrollValue > 60 ? header.classList.add('header--scroll') : header.classList.remove('header--scroll')
    })
  }

  headerSearchInput.addEventListener('input', function () {
    this.value ? headerSearch.classList.add('search--input') : headerSearch.classList.remove('search--input')
  })
  headerSearchInput.addEventListener('focus', function () {
    headerShadow.classList.add('active')
    document.documentElement.classList.add('ov-hidden')
  })
  headerSearchInput.addEventListener('focusout', function () {
    if (!this.value) {
      headerShadow.classList.remove('active')
      document.documentElement.classList.remove('ov-hidden')
    }
  })
  headerShadow.addEventListener('click', function () {
    headerShadow.classList.remove('active')
    headerSearch.classList.remove('search--input')
    document.documentElement.classList.remove('ov-hidden')
  })

  window.addEventListener('resize', function () {
    headerHeightCalc()
  })

  const catalogOpenButton = document.querySelector('.header__ui-button')
  const catalogNavButtons = document.querySelectorAll('.header-catalog__button')
  const catalogMainItems = document.querySelectorAll('.header-catalog__item')
  catalogOpenButton.addEventListener('click', function () {
    const headerHeight = header.offsetHeight
    const headerCatalog = document.querySelector('.header-catalog')

    this.classList.toggle('ui-button--burger-active')
    headerCatalog.classList.toggle('active')
    document.documentElement.classList.toggle('ov-hidden')
    if (this.classList.contains('ui-button--burger-active')) {
      document.documentElement.style.setProperty('--header-height-for-catalog', `${headerHeight}px`)
    }
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

function headerHeightCalc() {
  const headerHeight = document.querySelector('.header').offsetHeight
  // const headerMainHeight = document.querySelector('.header__main').offsetHeight
  document.documentElement.style.setProperty('--header-height', `${headerHeight}px`)
  // document.documentElement.style.setProperty('--header-main-height', `${headerMainHeight}px`)
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
  $('form').parsley({
    // errorClass: 'mmmmmmmparsley-error',
    // classHandler: function (field) {
    //   // $('#eeeel')
    //   field.$element.closest('.ui-input')
    //   // $(field).parents('.ui-input')
    //   // console.log($(field).parents('.ui-input'))
    //   // console.log($(field).parents('.ui-input'))
    //   // console.log(field.closest('.ui-input'))
    //   // closest
    //   // Field.parents('ui-input')
    //   // $(Field).parents('.ui-input')
    // }
  })
  window.Parsley.addValidator('phone', {
    validateString: function (value) {
      return (
        /^\+\d{11}(\d{1,2})?$/.test(value)
      )
    }
  })
}

// function header() {
//   const headerElement = document.querySelector('.header')
//   const burgerButton = headerElement.querySelector('.header__burger-btn')
//   burgerButton.addEventListener('click', function () {
//     headerElement.classList.toggle('header--burger-active')
//     document.documentElement.classList.toggle('ov-hidden')
//   })

// function tabs() {
//   setTimeout(() => {
//     for (const tabsElement of document.querySelectorAll('.tabs')) {
//       const tabsHead = tabsElement.querySelector('.tabs-head')
//       const tabsHeadItems = tabsHead.querySelectorAll('.tabs-head__item')
//       const overlay = tabsHead.querySelector('.tabs-head__overlay')
//       const activeTabsHead = tabsHead.querySelector('.tabs-head__item--active')
//       setTabOverlay(overlay, activeTabsHead)

//       const tabsContent = tabsElement.querySelector('.tabs-content')
//       const tabsContentSlider = new Swiper(tabsContent, {
//         autoHeight: true,
//         allowTouchMove: true,
//         spaceBetween: 50,
//         breakpoints: {
//           767: {
//             allowTouchMove: false
//           }
//         },
//         on: {
//           slideChangeTransitionStart: function (swiper) {
//             tabsHead.querySelector('.tabs-head__item--active').classList.remove('tabs-head__item--active')
//             tabsHeadItems[swiper.activeIndex].classList.add('tabs-head__item--active')
//             setTabOverlay(overlay, tabsHeadItems[swiper.activeIndex])
//           }
//         }
//       })

//       for (const tabsHeadItem of tabsHeadItems) {
//         tabsHeadItem.addEventListener('click', function () {
//           tabsHead.querySelector('.tabs-head__item--active').classList.remove('tabs-head__item--active')
//           this.classList.add('tabs-head__item--active')
//           setTabOverlay(overlay, this)
//           tabsContentSlider.slideTo([...this.parentNode.children].indexOf(this))
//         })
//       }
//       window.addEventListener('load', function () {
//         setTimeout(() => {
//           setTabOverlay(overlay, tabsHead.querySelector('.tabs-head__item--active'))
//         }, 300)
//       })
//     }
//   }, 100)
// }


// function getPopup(url) {
//   const popupUrl = url
//   Fancybox.show(
//     [
//       {
//         src: popupUrl,
//         preload: false
//       }
//     ],
//     {
//       mainClass: 'popup',
//       parentEl: document.querySelector('.wrapper'),
//       showClass: 'fancybox-fadeIn',
//       hideClass: 'fancybox-fadeOut',
//       closeButton: false,
//       hideScrollbar: true,
//       autoFocus: true,
//       trapFocus: true,
//       dragToClose: false,
//       animated: false
//     }
//   )
//   Fancybox.defaults.ScrollLock = false
//   return false
// }
