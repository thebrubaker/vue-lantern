import router from 'src/config/router'

describe('config/router.js', () => {
  it('should return saved position', () => {
    const savedPosition = { x: 150, y: 0 }

    expect(router.scrollBehavior(null, null, savedPosition)).to.deep.equal(savedPosition)
  })
  it('should return hash selector', () => {
    const to = { hash: '#go-here' }
    const expected = { selector: to.hash }

    expect(router.scrollBehavior(to)).to.deep.equal(expected)
  })
  it('should return default values', () => {
    const to = {}
    const expected = { x: 0, y: 0 }

    expect(router.scrollBehavior(to)).to.deep.equal(expected)
  })
})
