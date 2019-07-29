const routes = require('./routes/routes')
const factory = require('./middlewares/middlewares')

const port = process.env.PORT || 3000
process.env.ROOTDIR = __dirname

const app = factory.createExpressApp()

app.get('/', (req, res) => {
   res.render('index')
})

app.use('/country', routes.countries)

app.listen(port)