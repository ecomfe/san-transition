import san from 'san'
import App from './pages/App.san'
import {router} from 'san-router'
import Prism from 'prismjs'

// import API from './pages/API.san'
// import Examples from './pages/Examples.san'
// import GetStart from './pages/GetStart.san'
import Jumbotron from './components/Jumbotron.san'
import Nav from './components/Nav.san'
// import {transition} from '@/index.js'

import 'prismjs/themes/prism.css'
import 'normalize.css'
import './markdown.styl'

router.setMode('html5')

const jumbotron = new Jumbotron()
const nav = new Nav()
jumbotron.attach(document.body)
nav.attach(document.body)

// const $body = document.createElement('div')
// document.body.appendChild($body)

const $bodyEl = document.createElement('main')
document.body.appendChild($bodyEl)
const $body = 'main'

router.add({
  rule: '/',
  Component: App,
  target: $body
})
// .add({
//   rule: '/start',
//   Component: GetStart,
//   target: $body
// }).add({
//   rule: '/api',
//   Component: API,
//   target: $body
// }).add({
//   rule: '/examples',
//   Component: Examples,
//   target: $body
// })

router.start()

router.listen(e => {
  san.nextTick(() => {
    Prism.highlightAll()
  })
})
