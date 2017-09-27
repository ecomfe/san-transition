import {getHooks, getTimeout, afterNextFrame, addHook, removeHook} from './util.js'

export default (prop = 'san') => Component => {
  class Target extends Component {
  }

  const {attached, dispose} = Target.prototype

  // define css hooks name
  const hooks = getHooks(prop)

  // override attached lifecycle
  Target.prototype.attached = function () {
    // entering
    const {el} = this
    addHook(el, hooks.beforeEnter)
    const transitionHandler = () => {
      removeHook(el, hooks.beforeEnter)
      addHook(el, hooks.enter)
      setTimeout(() => removeHook(el, hooks.enter), getTimeout(el))
    }
    afterNextFrame(transitionHandler)
    attached && attached.call(this)
  }

  // override dispose lifecycle
  Target.prototype.dispose = function () {
    const {el} = this
    addHook(el, hooks.beforeLeave)
    el.transitionEl = el
    const transitionHandler = () => {
      addHook(el, hooks.leave)
      setTimeout(() => dispose.apply(this, arguments), getTimeout(el))
    }
    afterNextFrame(transitionHandler)
  }
  return Target
}
