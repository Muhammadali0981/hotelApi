const http = require('http');//imports http package
const app = require('./app')

//setting up port
const port = process.env.PORT || 3000; //ethier gets its from enviroment of Node js .env or sets it to 3000 

//creating server
const server = http.createServer(app);
//need to adda listener a function that is executed whenever  we get a new req
//app qualifies as a listener cuz it handles reqs XD
server.listen(port, () => {
    console.log(`Server at: http://localhost:${port}`);
});//starts "listening" at the port

