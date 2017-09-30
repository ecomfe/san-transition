```html
<template>
  <div>
    <transition-with-ifel class="delta">A component with transition effects.</transition-layer-with-ifel>
    <transition-with-ifel class="delta">A component with transition effects.</transition-layer-with-ifel>
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
    'transition-layer-with-ifel': transition('toggle')(YourComponent)
  }
}
</script>

<style lang="stylus">
.delta
  transition all .3s ease-out
  opacity 1
.toggle-enter, .toggle-before-leave
  transform rotate(0deg) translate(0, 0)
.toggle-before-enter
  opacity 0
  transform rotate(-180deg) translate(-200px, 0)
.toggle-leave
  opacity 0
  transform rotate(180deg) translate(200px, 0)
</style>
```