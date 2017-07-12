import App from './components/App.san'
import {router} from 'san-router'

import 'prismjs/themes/prism-tomorrow.css'
import 'normalize.css'
import './markdown.styl'

router.setMode('hash')

router.add({
  rule: '/',
  Component: App,
  target: 'body'
})

router.start()
