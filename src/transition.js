import {getTimeout, clearParentTimeout} from './util.js'

export default (prop = 'san') => Component => {
  class Target extends Component {
  }

  const {attached, attach, inited} = Target.prototype

  // define css hooks name
  const hooks = typeof prop === 'object'
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

  // define transition flags
  Target.prototype.isEntering = false
  Target.prototype.isLeaving = false

  // override attached lifecycle
  Target.prototype.attached = function () {
    // entering
    const {el, parent} = this
    clearParentTimeout(parent)
    el.classList.add(hooks.enter)
    parent.isEntering = true
    parent.transformEl = el
    const transitionHandler = () => {
      el.classList.remove(hooks.enter)
      parent.enteringTimeout = setTimeout(() => {
        parent.isEntering = false
      }, getTimeout(el))
    }
    el.classList.add(hooks.enterActive)
    requestAnimationFrame(transitionHandler)

    attached && attached.call(this)
  }

  // override attach function
  Target.prototype.attach = function () {
    // entering
    const {parent} = this
    if (parent.isLeaving) {
      parent.isEntering = true
      parent.isLeaving = false
      parent.transformEl.classList.add(hooks.enterActive)
      parent.transformEl.classList.remove(hooks.leave)
      parent.transformEl.classList.remove(hooks.leaveActive)
    } else {
      attach.apply(this, arguments)
    }
  }

  // override attached lifecycle
  Target.prototype.inited = function () {
    const {parent} = this
    const {updateView, _disposeChilds} = parent

    // override updateView function
    parent.updateView = function (changes) {
      const child = this.childs[0]
      if (this.evalExpr(this.cond)) {
        if (child) {
          if (parent.isLeaving) {
            // entering
            const el = this.transformEl
            parent.isEntering = true
            parent.isLeaving = false
            parent.transformEl.classList.add(hooks.enterActive)
            parent.transformEl.classList.remove(hooks.leave)
            parent.transformEl.classList.remove(hooks.leaveActive)
            parent.enteringTimeout = setTimeout(() => {
              parent.isEntering = false
              updateView.call(this, changes)
            }, getTimeout(el))
          }
        }
        updateView.call(this, changes)
      } else {
        // leaving
        const el = this.transformEl
        clearParentTimeout(parent)
        if (!parent.isLeaving) {
          parent.isEntering = false
          parent.isLeaving = true
          const leaveHandler = e => {
            if (parent.isLeaving) {
              _disposeChilds.call(this)
              parent.isLeaving = false
            }
          }
          const transitionHandler = () => {
            el.classList.add(hooks.leaveActive)
            parent.leavingTimeout = setTimeout(leaveHandler, getTimeout(el))
          }
          el.classList.remove(hooks.enter)
          el.classList.remove(hooks.enterActive)
          el.classList.add(hooks.leave)
          requestAnimationFrame(transitionHandler)
        }
      }
    }
    inited && inited.call(this)
  }
  return Target
}
