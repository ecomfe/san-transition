import san from 'san'
import App from './pages/App.san'
import {router} from 'san-router'
import Prism from 'prismjs'

import API from './pages/API.san'
import Examples from './pages/Examples.san'
import GetStart from './pages/GetStart.san'
import {transition} from '@/index.js'

import 'prismjs/themes/prism-tomorrow.css'
import 'normalize.css'
import './markdown.styl'

router.setMode('hash')

router.add({
  rule: '/',
  Component: transition()(App),
  target: 'body'
}).add({
  rule: '/start',
  Component: transition()(GetStart),
  target: 'body'
}).add({
  rule: '/api',
  Component: transition()(API),
  target: 'body'
}).add({
  rule: '/examples',
  Component: transition()(Examples),
  target: 'body'
})

router.start()

router.listen(e => {
  san.nextTick(() => {
    Prism.highlightAll()
  })
})
