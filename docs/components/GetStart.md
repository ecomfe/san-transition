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

```javascript
import san from 'san'
import {transition} from 'san-transition'

const RootTransition = san.defineComponent({
  template: '<div>Root element with transition effects.</div>'
  transition: transition('slide')
})

const ChildTransition = san.defineComponent({
  template: `<div>
    <div s-transition="hook('slide')">Child elements with transition effects.</div>
  </div>`
  hook: transition
})

const ListTransition = san.defineComponent({
  template: `<ul>
    <li s-for="item in list" s-transition="hook('slide')">Listed element with transition effects.</li>
  </ul>`,
  initData () {
    return {
      list: [1, 2, 3]
    }
  },
  hook: transition
})
```

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