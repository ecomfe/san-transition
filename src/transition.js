import {getHooks, prepareEnter, prepareLeave, getTimeout, clearParentTimeout, afterNextFrame, addHook, removeHook} from './util.js'

export default (prop = 'san') => Component => {
  class Target extends Component {
  }

  const {attached, attach, inited, dispose} = Target.prototype

  // define css hooks name
  const hooks = getHooks(prop)

  // define transition flags
  Target.prototype.isEntering = false
  Target.prototype.isLeaving = false

  // override attached lifecycle
  Target.prototype.attached = function () {
    // entering
    const {el, parent} = this
    addHook(el, prop)
    // if (parent) {
    //   clearParentTimeout(parent)
    //   el.style.animationFillMode = el.style.WebkitAnimationFillMode = 'forwards'
    //   addHook(el, hooks.in)
    //   parent.isEntering = true
    //   parent.transitionEl = el
    //   const transitionHandler = () => {
    //     removeHook(el, hooks.in)
    //     addHook(el, hooks.live)
    //     parent.enteringTimeout = setTimeout(() => {
    //       parent.isEntering = false
    //     }, getTimeout(el))
    //   }
    //   afterNextFrame(transitionHandler)
  
    //   attached && attached.call(this)
    // } else {
      el.style.animationFillMode = el.style.WebkitAnimationFillMode = 'forwards'
      addHook(el, hooks.in)
      el.transitionEl = el
      const transitionHandler = () => {
        removeHook(el, hooks.in)
        addHook(el, hooks.live)
      }
      afterNextFrame(transitionHandler)
      setTimeout(() => {
        removeHook(el, hooks.live)
      }, getTimeout(el))
      attached && attached.call(this)
    // }
  }

  // override attach function
  // Target.prototype.attach = function () {
  //   // entering
  //   const {parent, el} = this
  //   if (parent) {
  //     if (parent.isLeaving) {
  //       prepareEnter(parent, hooks)
  //     } else {
  //       attach.apply(this, arguments)
  //     }
  //   } else {
  //     attach.apply(this, arguments)
  //   }

  // }

  Target.prototype.dispose = function () {
    const {parent, el} = this
    // if (parent) {
    //   return dispose.apply(this, arguments)
    // }
    addHook(el, hooks.out)
    el.transitionEl = el
    addHook(el, hooks.live)
    const transitionHandler = () => {
      addHook(el, hooks.out)
    }
    afterNextFrame(transitionHandler)
    setTimeout(() => {
      dispose.apply(this, arguments)
    }, getTimeout(el))
  }

  // override inited lifecycle
  // Target.prototype.inited = function () {
  //   const {parent} = this
  //   if (parent) {
  //     const {updateView, _disposeChilds} = parent
  //     // override updateView function
  //     parent.updateView = function (changes) {
  //       const child = this.childs[0]
  //       const el = this.transitionEl
  
  //       if (!this.cond || this.evalExpr(this.cond)) {
  //         if (child && parent.isLeaving) {
  //           // entering
  //           prepareEnter(parent, hooks)
  //           parent.enteringTimeout = setTimeout(() => {
  //             parent.isEntering = false
  //             updateView.call(this, changes)
  //           }, getTimeout(el))
  //         } else {
  //           updateView.call(this, changes)
  //         }
  //       } else {
  //         // leaving
  //         clearParentTimeout(parent)
  //         if (!parent.isLeaving) {
  //           prepareLeave(parent, hooks)
  //           const leaveHandler = e => {
  //             if (parent.isLeaving) {
  //               _disposeChilds.call(this)
  //               parent.isLeaving = false
  //             }
  //           }
  //           const transitionHandler = () => {
  //             parent.leavingTimeout = setTimeout(leaveHandler, getTimeout(el))
  //             removeHook(el, hooks.live)
  //           }
  //           addHook(el, hooks.out)
  //           afterNextFrame(transitionHandler)
  //         }
  //       }
  //     }
  //   }
  //   inited && inited.call(this)
  // }

  return Target
}
