const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;  // in this why we take the port is the project should be run process.env is the environment variable

const server = http.createServer(app);
console.log('server is listing at' ,port)  // this is using our server is listen
server.listen(port);