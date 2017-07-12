// import App from './components/App.san'
// import {router} from 'san-router'
// // import Prism from 'prismjs'

// import 'prismjs/themes/prism-tomorrow.css'
// import 'normalize.css'
// import './markdown.styl'

// router.setMode('hash')

// router.add({
//   rule: '/',
//   Component: App,
//   target: 'body'
// })

// router.start()

import san from 'san'
import {transition} from '@/index.js'

const Component = san.defineComponent({
  template: `<div>
    <slot></slot>
  </div>`
})

const TransitionComponent = transition()(Component)

const App = san.defineComponent({
  template: `<div class="app">
    <div class="wrapper">
      <transition-component s-if="isShow">
        <img src="https://ecomfe.github.io/san/img/logo-colorful.svg" height="100">
      </transition-component>
    </div>
    <button on-click="toggle">Toggle</button>
  </div>`,
  components: {
    'transition-component': TransitionComponent
  },
  toggle () {
    this.data.set('isShow', !this.data.get('isShow'))
  },
  initData () {
    return {
      isShow: true
    }
  }
})

const app = new App()

app.attach(document.body)
