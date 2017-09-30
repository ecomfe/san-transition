```html
<template>
  <div>
    <transition-layer-with-animation class="epsilon">A component with transition effects.</transition-layer-with-animation>
  <div>
</template>

<script>
import san from 'san'
import {transition} from 'san-transition'

const YourComponent = san.defineComponent({
  template: `<div><slot></slot></div>`
})

export default {
  components: {
    'transition-layer-with-animation': transition('toggle')(YourComponent)
  }
}
</script>

<style lang="stylus">
.toggle-before-enter
  transform scale(0) translate(-100px, 0) rotate(360deg)
.toggle-enter
  animation come-in .5s
.toggle-leave
  animation go-out .5s
  animation-fill-mode forwards

@keyframes come-in
  0%
    transform scale(0) translate(-100px, 0) rotate(360deg)
  50%
    transform scale(1.2) translate(-50px, 0) rotate(-90deg)
  100%
    transform scale(1) translate(0, 0) rotate(0deg)

@keyframes go-out
  0%
    transform scale(1) translate(0, 0) rotate(0deg)
  50%
    transform scale(1.2) translate(50px, 0) rotate(90deg)
  100%
    transform scale(0) translate(100px, 0) rotate(-360deg)
</style>
```