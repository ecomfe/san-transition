```html
<template>
  <div>
    <custom-transition-layer class="gamma">A component with transition effects.</custom-transition-layer>
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
    'custom-transition-layer': transition({
      beforeEnter: 'off',
      enter: 'on',
      beforeLeave: 'on',
      leave: 'off'
    })(YourComponent)
  }
}
</script>

<style lang="stylus">
.gamma
  transition all .3s ease-out
  opacity 1
.on
  transform scale(1)
.off
  opacity 0
  transform scale(0)
</style>
```