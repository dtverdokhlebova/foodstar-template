document.addEventListener('DOMContentLoaded', function () {
  // header()
  // tabs()
  bannersList()
  brands()
  product()
  toTop()
})

window.addEventListener('load', function () {
  map()
})

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
    breakpoints: {
      767: {
        slidesPerView: 2
      }
    }
  })
}

function brands() {
  const brandsSlider = new Swiper(document.querySelector('.brands .swiper'), {
    spaceBetween: 10,
    slidesPerView: 2,
    watchSlidesProgress: true,
    breakpoints: {
      767: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  })
}

function product() {
  const productSlider = new Swiper(document.querySelector('.product-grid--4slider .swiper'), {
    spaceBetween: 15,
    slidesPerView: 'auto',
    breakpoints: {
      767: {
        spaceBetween: 10
      },
      1260: {
        spaceBetween: 20
      }
    }
  })
}

function toTop() {
  $('.footer__to-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600)
    return false
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
