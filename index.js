require('dotenv').config()
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const logs_table = require('./models/db_crud.js')


const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  


app.get('/api', function(req, res){
  
  //log query
  console.log(req.query)

  //add it to the database
  logs_table.add(req.query)
  .then(obj =>{
    res.status(200).json(obj)
  })
  .catch(error =>{
    res.status(500).json({message: 'Error with adding to DB'})
  })
  //res.render('pages/index')
});



app.get('/', function(req, res){
  //log query
  console.log(req.query)
  

  const rescue_time = require('./app_integrations/_get_rescue_time.js')
  const habits = require('./app_integrations/_get_habits.js')
  const weight = require('./app_integrations/_get_weight.js')

  Promise.all([rescue_time.df, habits.df, weight.df]).then((time, habits, weight) => {
    res.render('pages/index', {'data':time, 'habit_data': habits, 'weight':weight})

 })
});

app.get('/data', function(req,res){
  //get data from db
  logs_table.find()
  .then(obj =>{
    res.status(200).json(obj)
  })
  .catch(error =>{
    res.status(500).json({message: 'Error finding in DB'})
  })
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
