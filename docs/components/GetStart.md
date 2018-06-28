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

#### JavaScript

```javascript
import san from 'san'
import {transition} from 'san-transition'

// normal transition
const ChildTransition = san.defineComponent({
  template: `<div>
    <div s-transition="transition('slide')">Child elements with transition effects.</div>
  </div>`,
  transition
})

// a list of tracked elements
const ListTransition = san.defineComponent({
  template: `<ul>
    <li s-for="item in list trackBy item" s-transition="transition('slide', 300)">Listed element with transition effects.</li>
  </ul>`,
  initData () {
    return {
      list: [1, 2, 3, 4, 5]
    }
  },
  transition
})
```

#### CSS

```css
.slide-enter, .slide-leave {
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
```