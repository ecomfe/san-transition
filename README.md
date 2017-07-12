# San Transition

High order component factory for generating [san](//github.com/ecomfe/san) components with transition effects.

## Get Start

### Installation

```bash
$ npm install --save san-transition
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
.fade-enter-active, .fade-leave {
  opacity: 1;
  transform: translate(0, 0);
  transition: all .5s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
  transform: translate(100px, 0);
}

</style>
```

## API

### transition

- Arguments
  - {None, String, Object} hook name
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
    enterActive: 'custom-enter-active-hook',
    leave: 'custom-leave-hook',
    leaveActive: 'custom-leave-active-hook'
  })(YourComponent)
  ```

### transitionGroup (uncompleted)

Coming soon...

## CSS Hooks

- **enter** Applies when the component attaches DOM tree and removes in the next frame immediately.
- **enter-active** Applies in the next frame of **enter** hook, removes when the **leave** hook applies.
- **leave** Applies when the component will be disposed.
- **leave-active** Applies in the next frame of **leave** hook.
