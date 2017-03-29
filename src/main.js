import app from 'app'
import root from 'layouts/root'
import services from 'src/config/services'

app.boot(services).render(root)
