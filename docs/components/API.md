## API

### transition

To generate a transition object with properties `enter` and `leave` hook.

- Arguments
  - **{string}** CSS hook name
- Import
  ```javascript
  // In ES6 modules
  import {transition} from 'san-transition'

  // In CommonJS
  var transition = require('san-transition').transition

  // In browser runtime
  var transition = sanTransition.transition
  ```
- Usage
  ```javascript
  // To generate a transtion object with named hooks
  sanTransition('foo')

  // To generate a transtion object with default hooks
  // the same as `transition('san')`
  transition()
  ```

### CSS Hooks

`{name}` is the name which is declared by `san-transition`.

- **{name}-transition**: Applies when the component attaches DOM tree and never removes. It's usually used to declare the CSS transition property.
- **{name}-before-enter**: Applies when the component attaches DOM tree and removes in the next frame immediately.
- **{name}-before-leave**: Applies when the component will dispose.
- **{name}-enter**: Applies between the next frame of ***before-enter*** hook deactives and its transition ends.
- **{name}-leave**: Applies between the next frame of ***before-leave*** hook deactives and its transition ends.