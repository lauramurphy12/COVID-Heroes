
const dbC = require('./dbController.js');

const express = require("express")
const bodyParser = require("body-parser");
const cors = require('cors');

//routers
const authRouter = require('./controllers/authentication');
const postRouter = require('./controllers/MissionPost');
const mapRouter = require('./controllers/map');


// app initialization
const app = express();
app.options('*', cors());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// parse requests of content-type - application/json


app.use( function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Content-Type", "application/json");
    next();
});


app.get("/", (req, res) => {
  res.json({ message: "Welcome to CovidHeroes!" });
});

app.use('/', authRouter);
app.use('/', postRouter);
app.use('/', mapRouter);
// define the port number. process.env.port will check the environment variables to determine if port is already specified
// otherwise, port defaults to 4000

const PORT = process.env.PORT || 4000;
//console.log(" Environment variable for secret key is: ", process.env.SECRET_KEY);
//Here, passing a callback function to listen, that logs to console that server is running at specified port.
app.listen(PORT, () => 
   console.log(`Server is running at port ${PORT}`));
   // dbC.openConnection();
    //let user = dbC.findAll("User");
    //console.log(user);
    //dbC.close(); 

 
