import {getHooks, prepareEnter, prepareLeave, getTimeout, clearParentTimeout} from './util.js'

export default (prop = 'san') => Component => {
  class Target extends Component {
  }

  const {attached, attach, inited} = Target.prototype

  // define css hooks name
  const hooks = getHooks(prop)

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
    parent.transitionEl = el
    const transitionHandler = () => {
      el.classList.remove(hooks.enter)
      parent.enteringTimeout = setTimeout(() => {
        parent.isEntering = false
      }, getTimeout(el))
    }
    el.classList.add(hooks.enterActive)
    setImmediate(transitionHandler)

    attached && attached.call(this)
  }

  // override attach function
  Target.prototype.attach = function () {
    // entering
    const {parent} = this
    if (parent.isLeaving) {
      prepareEnter(parent, hooks)
    } else {
      attach.apply(this, arguments)
    }
  }

  // override inited lifecycle
  Target.prototype.inited = function () {
    const {parent} = this
    const {updateView, _disposeChilds} = parent

    // override updateView function
    parent.updateView = function (changes) {
      const child = this.childs[0]
      const el = this.transitionEl
      if (this.evalExpr(this.cond)) {
        if (child && parent.isLeaving) {
          // entering
          prepareEnter(parent, hooks)
          parent.enteringTimeout = setTimeout(() => {
            parent.isEntering = false
            updateView.call(this, changes)
          }, getTimeout(el))
        } else {
          updateView.call(this, changes)
        }
      } else {
        // leaving
        clearParentTimeout(parent)
        if (!parent.isLeaving) {
          prepareLeave(parent, hooks)
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
          setImmediate(transitionHandler)
        }
      }
    }
    inited && inited.call(this)
  }

  return Target
}
