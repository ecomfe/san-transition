var transition = sanTransition.transition
function nextFrame (callback) {
  return requestAnimationFrame(callback)
}
function afterNextFrame(callback) {
  return nextFrame(function () {
    return nextFrame(callback)
  })
}

function isClassNameExists (el, name) {
  return (new RegExp(name)).test(el.className)
}
