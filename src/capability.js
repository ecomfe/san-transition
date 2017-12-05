/**
 * @file Runtime capability testing
 */

const capability = {
  raf: global.requestAnimationFrame,
  classList: document.createElement('a').classList
}

if (!capability.raf) {
  console.warn('`san-transition` will not to work because `requestAnimationFrame` API or polyfill is required.')
}

if (!capability.classList) {
  console.warn('`san-transition` will not to work because `Element.prototype.classList` API or polyfill is required.')
}

export default capability.raf && capability.classList
