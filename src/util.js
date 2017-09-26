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

export const afterNextFrame = fn => requestAnimationFrame(() => requestAnimationFrame(fn))

export const clearParentTimeout = parent => {
  if (!parent) {
    return
  }
  clearTimeout(parent.leavingTimeout)
  clearTimeout(parent.enteringTimeout)
}

export const prepareEnter = (parent, hooks) => {
  const {transitionEl} = parent
  parent.isEntering = true
  parent.isLeaving = false
  transitionEl.classList.add(hooks.live)
  transitionEl.classList.remove(hooks.out)
}

export const prepareLeave = (parent, hooks) => {
  const {transitionEl} = parent
  parent.isEntering = false
  parent.isLeaving = true
  transitionEl.classList.remove(hooks.in)
  transitionEl.classList.remove(hooks.live)
  transitionEl.classList.add(hooks.out)
}

export const getHooks = prop => typeof prop === 'object'
  ? {
    in: prop.in || 'san-in',
    out: prop.out || 'san-out',
    live: prop.leave || 'san-live'
  }
  : {
    in: `${prop}-in`,
    out: `${prop}-out`,
    live: `${prop}-live`
  }

export const addHook = (el, hook) => el.classList.add(hook)
export const removeHook = (el, hook) => el.classList.remove(hook)

export const disableEl = el => el.style.pointerEvents = 'none'
export const enableEl = el => el.style.pointerEvents = ''
