const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
//MODELOS
const modelo= require("./modelo.js")
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get('/', function (req, res) {
  modelo.inicio('Paola', function (err,filas)
{

  if (err) 
  {

    return res.status(500).json({error: "Ocurrio un error"})
    
  } else 
  {
    
    return res.json(filas);

  }

})
  //res.send('Hello World')
})
app.get('/verificar', function(req,res)
{

  var email = req.query.email;
  var pass = req.query.pass;

  modelo.verificar(email,pass, function(err,filas)
  {

    if (err) {
      
      return res.status(500).json({error: "Ocurrio un error" })

    }
    else 
    {

      return res.json(filas);

    }

  })

})
app.listen(4000)

app.post('/enviarCorreo', function(req,res){

  var email = req.body.email;
  var token = req.body.token;

  modelo.enviarCorreo(email,token, function(err, fila){

    modelo.enviarCorreo(email,token, function(err,filas)
    {
  
      if (err) {
        
        return res.status(500).json({error: "Ocurrio un error" })
  
      }
      else 
      {
  
        return res.json(filas);
  
      }
  
    })


  })

})

app.get('/verificarToken', function (req, res) 
{
  var token = req.query.token;

    jwt.verify(token, 'claveToken2024', function(err, filas) {
    if (err) 
      {
      return res.status(500).json({ status: 'error', mensaje: err })
    }
    else{
    return res.status(200).json({ status: "Todo ok", mensaje: filas})
    }
  })
})