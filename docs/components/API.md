
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
    in: 'custom-transition-in-hook'
    out: 'custom-transition-out-hook',
    live: 'custom-live-hook',
  })(YourComponent)
  ```

### transitionGroup (uncompleted)

Coming soon...

## CSS Hooks

- **in** - Applies when the component attaches DOM tree and removes in the next frame immediately.
- **out** - Applies when the component will dispose.
- **live** - Applies between the next frame of ***in*** hook deactives and ***out*** hook actives.