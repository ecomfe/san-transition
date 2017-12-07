import {getTimeout, addHook} from '@/util.js'

describe('Compute timeout', function () {
  it ('transition timeout', function () {
    var $dom = document.createElement('div')
    document.body.appendChild($dom)
    addHook($dom, 'fade-enter')
    expect(getTimeout($dom)).toBe(1e3)
    document.body.removeChild($dom)
  })
})