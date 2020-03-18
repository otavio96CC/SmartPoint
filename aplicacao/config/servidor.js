let express = require('express')
let consign = require('consign')
let bodyParser = require('body-parser');

//let es6Renderer = require('es6-template-render')

let app = express()
//app.engine('html', es6Renderer);

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'ejs');
app.set('views', './app/views')

consign()
    .include('app/rotas')
    .then('config/dbConexao.js')
    .then('app/modelos')
    .into(app)

module.exports = app






