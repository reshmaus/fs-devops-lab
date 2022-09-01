const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')

app.use(express.json())
app.use(cors());

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '52e64ea3099d40aea8a000105dff5a7d',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/',function(req, res){
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/css', function(req, res) {
    res.sendFile(path.join(__dirname, '../styles.css'))
  })

  app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '../main.js'))
  })

try {
    rollbar.log("display error")
    // nonExistentFunction();
  } catch (error) {
    console.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }



const port = process.env.PORT || 5050

app.listen(port, () => console.log(`Server listening on ${port}`))