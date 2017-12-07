# San Transition

Append transition effects for elements in [san](//github.com/ecomfe/san) components.

[![Build Status](https://travis-ci.org/ecomfe/san-transition.svg?branch=master)](https://travis-ci.org/ecomfe/san-transition)
[![npm](https://img.shields.io/npm/v/san-transition.svg)](https://img.shields.io/npm/v/san-transition.svg)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

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
  <div>An Element with transition effects.<div>
</template>

<script>
import san from 'san'
import {transition} from 'san-transition'

export default {
  transition: transition('slide')
}
</script>

<style>
.slide {
  transition: all .5s;
}
.slide-enter, .slide-before-leave {
  opacity: 1;
  transform: translate(0, 0);
}
.slide-before-enter, .slide-leave {
  opacity: 0;
  transform: translate(100px, 0);
}
</style>
```

### API

### transition

To generate a transition object with properties `enter` and `leave` hook.

- Arguments
  - **{string}** CSS hook name
- Import
  ```javascript
  // For ES6 modules
  import {transition} from 'san-transition'

  // For CommonJS
  var transition = require('san-transition').transition

  // For browser runtime
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

## CSS Hooks

`{name}` is the name which is declared by `san-transition`.

- **{name}-transition**: Applies when the component attaches DOM tree and never removes. It's usually used to declare the CSS transition property.
- **{name}-before-enter**: Applies when the component attaches DOM tree and removes in the next frame immediately.
- **{name}-before-leave**: Applies when the component will dispose.
- **{name}-enter**: Applies between the next frame of ***before-enter*** hook deactives and its transition ends.
- **{name}-leave**: Applies between the next frame of ***before-leave*** hook deactives and its transition ends.