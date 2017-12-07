/**
 * @file Runtime capability testing
 */

const capability = ({
  raf: global.requestAnimationFrame,
  getComputedStyle: global.getComputedStyle,
  classList: document.createElement('a').classList
})

/* istanbul ignore if */
if (!capability.getComputedStyle) {
  console.warn('`san-transition` will not to work because `getComputedStyle` API or polyfill is required.')
}

/* istanbul ignore if */
if (!capability.raf) {
  console.warn('`san-transition` will not to work because `requestAnimationFrame` API or polyfill is required.')
}

/* istanbul ignore if */
if (!capability.classList) {
  console.warn('`san-transition` will not to work because `Element.prototype.classList` API or polyfill is required.')
}

export default capability.raf && capability.classList
