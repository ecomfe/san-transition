/**
 * @file Transition object generator
 */

import { getTimeout, addHook, removeHook } from './util'
import stage from './stage'
import capability from './capability'

export default (name = 'san', stagger = 0) => {
  const hooks = {
    beforeEnter: `${name}-before-enter`,
    enter: `${name}-enter`,
    beforeLeave: `${name}-before-leave`,
    leave: `${name}-leave`
  }
  return {
    enter (el, done) {
      /* istanbul ignore if */
      if (!capability) {
        return done()
      }
      addHook(el, hooks.beforeEnter)
      const transitionHandler = () => {
        removeHook(el, hooks.beforeEnter)
        addHook(el, hooks.enter)
        setTimeout(() => {
          removeHook(el, hooks.enter)
          done()
        }, getTimeout(el))
      }
      stage(el, stagger, transitionHandler)
    },
    leave (el, done) {
      /* istanbul ignore if */
      if (!capability) {
        return done()
      }
      addHook(el, hooks.beforeLeave)
      const transitionHandler = () => {
        removeHook(el, hooks.beforeLeave)
        addHook(el, hooks.leave)
        setTimeout(done, getTimeout(el))
      }
      stage(el, stagger, transitionHandler)
    }
  }
}
