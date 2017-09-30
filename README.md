# San Transition

High order component factory for generating [san](//github.com/ecomfe/san) components with transition effects.

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

### API

### transition

- Arguments
  - **{None, String, Object}** hook id
- Usage
  ```javascript
  // register default hooks
  // the same as `transition('san')(YourComponent)`
  transition()(YourComponent)

  // register named hooks
  transition('foo')(YourComponent)

  // register custom hooks
  transition({
    enter: 'custom-enter-hook'
    beforeEnter: 'custom-before-enter-hook',
    leave: 'custom-leave-hook',
    beforeLeave: 'custom-before-leave-hook'
  })(YourComponent)
  ```

### transitionGroup (under development)

Coming soon...

## CSS Hooks

- **before-enter**: Applies when the component attaches DOM tree and removes in the next frame immediately.
- **before-leave**: Applies when the component will dispose.
- **enter**: Applies between the next frame of ***before-enter*** hook deactives and its transition ends.
- **leave**: Applies between the next frame of ***before-leave*** hook deactives and its transition ends.