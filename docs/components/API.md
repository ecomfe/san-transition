
## API

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