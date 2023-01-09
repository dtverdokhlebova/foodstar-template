document.addEventListener('DOMContentLoaded', function () {
  // header()
  // tabs()
  uiRange()
  uiSelects()
  bannersList()
  brands()
  product()
  tabs()
  toTop()
  validation()
})

window.addEventListener('load', function () {
  map()
})

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

function toString(line) {
  return Number.parseInt(line, 10).toString().replace(/(\d{1,3}(?=(?:\d{3})+(?!\d)))/g, '$1 ')
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
      },
      // 1360: {
      //   slidesPerView: 2,
      //   loop: false
      // }
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

function product() {
  const productSliders = document.querySelectorAll('.product-grid--4slider .swiper')
  for (const item of productSliders) {
    const productSlider = new Swiper(item, {
      spaceBetween: 15,
      slidesPerView: 'auto',
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
            for (const item of bodyItems) {
              item.classList.remove('active')
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

function toTop() {
  $('.footer__to-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600)
    return false
  })
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

//   const headerShadow = headerElement.querySelector('.header__shadow')
//   headerShadow.addEventListener('click', function () {
//     headerElement.classList.remove('header--burger-active')
//     document.documentElement.classList.remove('ov-hidden')
//   })

//   headerDimensions()
//   window.addEventListener('resize', headerDimensions)
// }

// function headerDimensions() {
//   const headerHeight = document.querySelector('.header').offsetHeight
//   document.documentElement.style.setProperty('--header-height', `${headerHeight}px`)
// }

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

//       window.addEventListener('resize', function () {
//         setTimeout(() => {
//           setTabOverlay(overlay, tabsHead.querySelector('.tabs-head__item--active'))
//         }, 300)
//       })
//       window.addEventListener('load', function () {
//         setTimeout(() => {
//           setTabOverlay(overlay, tabsHead.querySelector('.tabs-head__item--active'))
//         }, 300)
//       })
//     }
//   }, 100)
// }

// function setTabOverlay(overlay, activeTabsHead) {
//   overlay.style.transform = `translateX(${activeTabsHead.offsetLeft}px) scaleX(${activeTabsHead.offsetWidth})`
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
