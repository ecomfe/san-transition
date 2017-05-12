import App from './components/App.san'
import {router} from 'san-router'

router.setMode('hash')

router.add({
  rule: '/',
  Component: App,
  target: 'body'
})

router.start()