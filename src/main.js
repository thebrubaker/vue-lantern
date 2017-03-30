import app from 'app'
import view from 'components/root'
import services from 'src/config/services'
import directory from 'utilities/directory'
let modules = directory('store/modules')

app.boot(services).load(modules).render(view)
