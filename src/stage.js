/**
 * @file Staged transition handler
 */

import asap from 'asap'
import { afterNextFrame } from './util'

const stacks = {}
export default function (el, stagger, transitionHandler, done) {
  if (stagger) {
    const parentEl = el.parentElement
    if (!parentEl) {
      console.warn('Transition with stagger needs a parent element.')
      return transitionHandler()
    }
    if (!parentEl.id) {
      parentEl.id = `__san_transition_${Date.parse(new Date())}`
    }
    const parentId = parentEl.id
    stacks[parentId] = stacks[parentId] || []
    stacks[parentId].push(el.id)
    asap(() => { stacks[parentId] = [] })
    ;(step => setTimeout(() => afterNextFrame(transitionHandler), stagger * step))(stacks[parentId].length - 1)
  } else {
    afterNextFrame(transitionHandler)
  }
}
