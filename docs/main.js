import App from './pages/App.san'
import Jumbotron from './components/Jumbotron.san'
import Nav from './components/Nav.san'

import 'prismjs/themes/prism.css'
import 'normalize.css'
import './markdown.styl'

const jumbotron = new Jumbotron()
const nav = new Nav()
const app = new App()
jumbotron.attach(document.body)
nav.attach(document.body)
app.attach(document.body)

// const $bodyEl = document.createElement('main')
// document.body.appendChild($bodyEl)
// const $body = 'main'

// router.add({
//   rule: '/',
//   Component: App,
//   target: $body
// })

// router.start()

// router.listen(e => {
//   san.nextTick(() => {
//     Prism.highlightAll()
//   })
// })
