var mysql = require("mysql");
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const serverless = require('serverless-http');
var path = require('path');

const app = express()

var connectionstring = 'mongodb+srv://yoda:fakultetskasifranrs@cluster0.hrfd2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'



const router = express.Router();


app.use(bodyParser.urlencoded({ extended: true })) 

app.set('view engine', 'ejs')


router.get('/testiramo', (req,res)=>{
  res.json({
    "helo": "hi"  //test rute za netlify
  });
});

router.get('/', (req, res) => {
  res.sendFile(path.resolve('views/login.html'));
});



MongoClient.connect(connectionstring, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')




    const db = client.db('skladiste')
    const usersCollection = db.collection('korisnici')


    router.post('/login', (req, res) => {
      usersCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/getUsers') //da ne loaduje beskonacno nakon posta
        })
        .catch(error => console.error(error))
    })

    router.get('/getUsers', (req, res) => {
      db.collection('korisnici').find().toArray()
        .then(results => {
          res.render('getUsers.ejs', { korisnici: results })
        })
        .catch(error => console.error(error))


    })


  })




/*
router.listen(3030, function () {
  console.log('listening on 3030')
})
*/

app.use(`/.netlify/functions/api`, router);


module.exports = app;
module.exports.handler = serverless(app);