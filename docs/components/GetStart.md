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
    <transition-layer>A component with transition effects.</transition-layer>
  <div>
</template>

<script>
import {transition} from 'san-transition'
import {YourComponent} from 'YOUR_SAN_COMPONENT'

export default {
  components: {
    'transition-layer': transition('fade')(YourComponent)
  }
}
</script>

<style>
.fade-live {
  opacity: 1;
  transform: translate(0, 0);
  transition: all .5s;
}
.fade-in, .fade-out {
  opacity: 0;
  transform: translate(100px, 0);
}
</style>

```