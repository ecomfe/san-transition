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
  clearTimeout(parent.leavingTimeout)
  clearTimeout(parent.enteringTimeout)
}

export const prepareEnter = (parent, hooks) => {
  const {transitionEl} = parent
  parent.isEntering = true
  parent.isLeaving = false
  transitionEl.classList.add(hooks.enterActive)
  transitionEl.classList.remove(hooks.leave)
  transitionEl.classList.remove(hooks.leaveActive)
}

export const prepareLeave = (parent, hooks) => {
  const {transitionEl} = parent
  parent.isEntering = false
  parent.isLeaving = true
  transitionEl.classList.remove(hooks.enter)
  transitionEl.classList.remove(hooks.enterActive)
  transitionEl.classList.add(hooks.leave)
}

export const getHooks = prop => typeof prop === 'object'
  ? {
    enter: prop.enter || 'san-enter',
    enterActive: prop.enterActive || 'san-enter-active',
    leave: prop.leave || 'san-leave',
    leaveActive: prop.leaveActive || 'san-leave-active'
  }
  : {
    enter: `${prop}-enter`,
    enterActive: `${prop}-enter-active`,
    leave: `${prop}-leave`,
    leaveActive: `${prop}-leave-active`
  }
