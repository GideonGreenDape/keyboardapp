const http= require('http');
const expresApp= require('./express')

const port= 5000;
const host = 'localhost';

const server=http.createServer(expresApp);

server.listen(port,host,()=>{
    console.log(`server is listening on ${port}`);
});


