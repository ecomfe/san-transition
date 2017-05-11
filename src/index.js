export default prop => Target => {
  const {inited, attached, created, detached} = Target.prototype
  const hooks = {
      enter: `${prop}-enter`,
      enterActive: `${prop}-enter-active`,
      leave: `${prop}-leave`,
      leaveActive: `${prop}-leave-active`,
  }

  Target.prototype.attached = function () {
    const {el} = this
    el.classList.add(hooks.enterActive)
    requestAnimationFrame(() => el.classList.remove(hooks.enter))
    attached && attached.call(this)
  }

  Target.prototype.created = function () {
    const {el} = this
    el.classList.add(hooks.enter)
    el.addEventListener('transitionend', () => el.classList.remove(hooks.enterActive))
    created && created.call(this)
  }

  return Target
}