document.addEventListener('DOMContentLoaded', function () {
  // header()
  // tabs()
})

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
