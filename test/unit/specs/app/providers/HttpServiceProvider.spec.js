import HttpServiceProvider from 'src/app/providers/HttpServiceProvider'
import AxiosHttpService from 'services/AxiosHttpService'

describe('HttpServiceProvider.js', () => {
  it('should bind an http service to the application', () => {
    let app = {
      bind: sinon.spy()
    }
    HttpServiceProvider.boot(app)
    expect(app.bind.called).to.be.true
    expect(app.bind.args[0][0]).to.equal('http')
    expect(app.bind.args[0][1]).to.be.a.function
    expect(app.bind.args[0][1]()).to.be.instanceOf(AxiosHttpService)
  })

  it('should register http defaults', () => {
    let app = {
      http: {
        setDefaults: sinon.spy()
      }
    }
    HttpServiceProvider.register(app)
    expect(app.http.setDefaults.called).to.be.true
  })
})
