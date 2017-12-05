
/**
 * @file Transition object generator
 */

import { getTimeout, afterNextFrame, addHook, removeHook } from './util'
import capability from './capability.js'

export default (name = 'san') => {
  const hooks = {
    transition: `${name}-transition`,
    beforeEnter: `${name}-before-enter`,
    enter: `${name}-enter`,
    beforeLeave: `${name}-before-leave`,
    leave: `${name}-leave`
  }
  return {
    enter (el, done) {
      if (!capability) {
        return done()
      }
      addHook(el, hooks.transition)
      addHook(el, hooks.beforeEnter)
      const transitionHandler = () => {
        removeHook(el, hooks.beforeEnter)
        addHook(el, hooks.enter)
        setTimeout(() => {
          removeHook(el, hooks.enter)
          done()
        }, getTimeout(el))
      }
      afterNextFrame(transitionHandler)
    },
    leave (el, done) {
      if (!capability) {
        return done()
      }
      addHook(el, hooks.beforeLeave)
      const transitionHandler = () => {
        removeHook(el, hooks.beforeLeave)
        addHook(el, hooks.leave)
        setTimeout(done, getTimeout(el))
      }
      afterNextFrame(transitionHandler)
    }
  }
}
