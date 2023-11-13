const express= require('express');
const usersRoute= require('./controller/users/account');

const app= express();

app.use(express.json()) 


// This for the route login relating to users
app.use(usersRoute);




module.exports= app;