import stage from '@/stage'

describe('Staged transition', function () {

  it ('normal transition', function (done) {
    var $item1 = document.createElement('div')
    var $item2 = document.createElement('div')
    document.body.appendChild($item1)
    document.body.appendChild($item2)
    var count = 0
    function transitionHandler () {
      return count++
    }

    stage($item1, 300, transitionHandler)
    stage($item2, 300, transitionHandler)

    nextFrame(() => afterNextFrame(() => {
      expect(count).toBe(1)
      setTimeout(() => {
        expect(count).toBe(2)
        document.body.removeChild($item1)
        document.body.removeChild($item2)
        done()
      }, 400)
    }))
  })

  it ('without stagger', function (done) {
    var isDone = false
    function transitionHandler () {
      isDone = true
    }
    var $dom = document.createElement('div')
    stage($dom, 0, transitionHandler)
    nextFrame(() => afterNextFrame(() => {
      expect(isDone).toBe(true)
      done()
    }))
  })

  it ('without parent element', function () {
    var isDone = false
    function transitionHandler () {
      isDone = true
    }
    var $dom = document.createElement('div')
    stage($dom, 100, transitionHandler)
    expect(isDone).toBe(true)
  })
})