export default (prop = 'san') => Target => {
  const {attached, created, dispose} = Target.prototype
  const hooks = {
    enter: `${prop}-enter`,
    enterActive: `${prop}-enter-active`,
    leave: `${prop}-leave`,
    leaveActive: `${prop}-leave-active`,
  }
  Target.prototype.dispose = function () {
    const {el} = this
    el.classList.add(hooks.leave)
    requestAnimationFrame(() => {
      el.classList.remove(hooks.leave)
      el.classList.add(hooks.leaveActive)
    })

    const leaveHandler = e => {
      el.removeEventListener('transitionend', leaveHandler)
      dispose.call(this)
    }

    el.addEventListener('transitionend', leaveHandler)
  }

  Target.prototype.attached = function () {
    const {el} = this
    const enterHandler = e => {
      el.removeEventListener('transitionend', enterHandler)
      el.classList.remove(hooks.enterActive)
    }
    el.addEventListener('transitionend', enterHandler)
    el.classList.add(hooks.enterActive)
    requestAnimationFrame(() => el.classList.remove(hooks.enter))
    attached && attached.call(this)
  }

  Target.prototype.created = function () {
    const {el} = this
    el.classList.add(hooks.enter)
    created && created.call(this)
  }

  return Target
}