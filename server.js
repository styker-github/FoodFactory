const http = require('http')
const mongoose = require('mongoose')

const uri = require('./config').mongoURI
const port = require('./config').port
const app = require('./app');

const server = http.createServer(app)


//Db connection
mongoose.connect(uri, { 
  useNewUrlParser: true ,
  useUnifiedTopology: true
}, (err, database) => {
    if (err) return console.error(err);
  
    server.listen(port, () => {
      console.log(`Food Factory app started at port ${port}`)
    })
});



