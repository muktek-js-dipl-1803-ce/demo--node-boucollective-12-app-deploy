const express = require('express')
const ejs = require('ejs')

const bodyParser = require('body-parser')

const knex = require('knex')
const { Model } = require('objection')



const passport = require('passport')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')


const registerLocalStrategy = require('./src/middleware/passport-local--registerLocalStrategy.js')
const { configDeserializeUser, configSerializeUser } = require('./src/helpers/passport-local--sessionActions.js')

const dbConfigObj = require('./knexfile.js')

const pageRouter = require('./src/routers/pageRouter.js')
const apiRouter = require('./src/routers/apiRouter.js')

const authRouter = require('./src/routers/authRouter')


const app = express()
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000


if(typeof process.env.NODE_ENV === 'undefined'){
  console.log("YOU MUST DEFINE THE NODE_ENV!!!")
  process.exit()
}

app.use( cookieParser() )
app.use( cookieSession({
  name: 'cookiesession',
  secret: 'supercookiesecret',
  httpOnly: true,
  signed: false
}))



app.use(passport.initialize())
app.use(passport.session())
passport.use(registerLocalStrategy())
passport.serializeUser(configSerializeUser())
passport.deserializeUser(configDeserializeUser())

const appDb = knex( dbConfigObj )
Model.knex(appDb)
app.locals.db = appDb

app.use( bodyParser.urlencoded({extended: false}) )
app.use( bodyParser.json() )


app.use( express.static( `${__dirname}/public` ) )

app.engine( 'ejs', ejs.renderFile )
app.set('view engine', 'ejs')
app.set('views', `${__dirname}/src/views`)

app.use('/auth', authRouter )
app.use('/api', apiRouter)
app.use('/', pageRouter)


// PART 1 - Render reactApp.js view (which links to 'public/js/bundle.js'
//          where the react app is transpiled)

app.use((req, res)=>{
  res.render('reactApp.ejs')
})

app.listen(PORT, ()=>{
  console.log('==========================')
  console.log(`App listening on localhost:${PORT}`);
  console.log(`Environment : ${process.env.NODE_ENV}`)
  console.log('==========================')
})
