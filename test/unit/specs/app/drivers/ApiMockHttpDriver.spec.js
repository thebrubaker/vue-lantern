import ApiMockHttpDriver from 'src/app/drivers/ApiMockHttpDriver'

describe('ApiMockHttpDriver', () => {
  const mock = {}
  it('should initialize', () => {
    const driver = new ApiMockHttpDriver(mock)
    driver.mock.should.deep.equal(mock)
  })
})
