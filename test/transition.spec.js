describe('Single element transition', function () {
  it ('transition when attached', function (done) {
    var wrap = document.createElement('div');
    document.body.appendChild(wrap);
    var MyComponent = san.defineComponent({
      template: '<div>Element with transition effects.</div>',
      transition: transition('fade'),
      attached: function () {
        const el = this.el
        nextFrame(function () {
          expect(isClassNameExists(el, 'fade-transition')).toBe(true)
          expect(isClassNameExists(el, 'fade-before-enter')).toBe(true)
          expect(isClassNameExists(el, 'fade-enter')).toBe(false)
          afterNextFrame(function () {
            expect(isClassNameExists(el, 'fade-transition')).toBe(true)
            expect(isClassNameExists(el, 'fade-before-enter')).toBe(false)
            expect(isClassNameExists(el, 'fade-enter')).toBe(true)
            myComponent.dispose()
            document.body.removeChild(wrap)
            done()
          })
        })
      }
    })
    var myComponent = new MyComponent()
    myComponent.attach(wrap)
  })

  it ('transition when dispose', function (done) {
    var wrap = document.createElement('div');
    document.body.appendChild(wrap);
    var MyComponent = san.defineComponent({
      template: '<div>Element with transition effects.</div>',
      transition: transition('fade'),
      attached: function () {
        const el = this.el
        myComponent.dispose()
        nextFrame(function () {
          expect(isClassNameExists(el, 'fade-transition')).toBe(true)
          expect(isClassNameExists(el, 'fade-before-leave')).toBe(true)
          expect(isClassNameExists(el, 'fade-leave')).toBe(false)
          afterNextFrame(function () {
            expect(isClassNameExists(el, 'fade-transition')).toBe(true)
            expect(isClassNameExists(el, 'fade-before-leave')).toBe(false)
            expect(isClassNameExists(el, 'fade-leave')).toBe(true)
            done()
            document.body.removeChild(wrap)
          })
        })
      }
    })
    var myComponent = new MyComponent()
    myComponent.attach(wrap)
  })
})