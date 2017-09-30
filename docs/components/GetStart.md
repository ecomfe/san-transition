## Get Start

### Installation

#### NPM

```bash
$ npm install --save san-transition
```

#### CDN

```html
<script src="//unpkg.com/san-transition"></script>
```

### Usage

```html
<template>
  <div>
    <transition-layer class="layer">A component with transition effects.</transition-layer>
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
    'transition-layer': transition('fade')(YourComponent)
  }
}
</script>

<style>
.layer {
  transition: all .5s;
}
.fade-enter, .fade-before-leave {
  opacity: 1;
  transform: translate(0, 0);
}
.fade-before-enter, .fade-leave {
  opacity: 0;
  transform: translate(100px, 0);
}
</style>

```