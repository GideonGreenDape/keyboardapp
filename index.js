const http= require('http');

const port= 5000;
const host = 'localhost';

const server=http.createServer();

server.listen(port,host,()=>{
    console.log(`server is listening on ${port}`);
});


