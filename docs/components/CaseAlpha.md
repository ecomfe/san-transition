```html
<template>
  <div>
    <default-transition-layer class="alpha">A component with transition effects.</default-transition-layer>
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
    'default-transition-layer': transition()(YourComponent)
  }
}
</script>

<style lang="stylus">
.alpha
  transition all .3s ease-out
  opacity 1
.san-enter, .san-before-leave
  transform translate(0, 0)
.san-before-enter
  opacity 0
  transform translate(-50px, 0)
.san-leave
  opacity 0
  transform translate(50px, 0)
</style>
```