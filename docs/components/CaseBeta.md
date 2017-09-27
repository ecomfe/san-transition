```html
<template>
  <div>
    <named-transition-layer class="beta">A component with transition effects.</named-transition-layer>
  <div>
</template>

<script>
import {transition} from 'san-transition'

const YourComponent = san.defineComponent({
  template: `<div><slot></slot></div>`
})

export default {
  components: {
    'default-transition-layer': transition('toggle')(YourComponent)
  }
}
</script>

<style lang="stylus">
.beta
  transition all .3s ease-out
  opacity 1
.toggle-enter, .toggle-before-leave
  transform translate(0, 0)
.toggle-before-enter, .toggle-leave
  opacity 0
  transform translate(0, -50px)
</style>
```