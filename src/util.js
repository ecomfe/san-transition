const getTime = (duration, delay) => Math.max.apply(this, duration.map((str, i) => getFloat(str) + parseFloat(delay[i])))

const getFloat = (str) => (parseFloat(str) || 0) * 1000

export const getTimeout = el => {
  const style = getComputedStyle(el)
  const transDuration = style.transitionDuration.split(',')
  const transDelay = style.transitionDelay.split(',')
  const aniDuration = style.animationDuration.split(',')
  const aniDelay = style.animationDelay.split(',')
  return Math.max(getTime(transDuration, transDelay), getTime(aniDuration, aniDelay))
}

export const clearParentTimeout = parent => {
  clearTimeout(parent.leavingTimeout)
  clearTimeout(parent.enteringTimeout)
}
