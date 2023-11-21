// This page implement it's own signup logic and, not using any form validator and it sanitizes
// user's details to the best of it logic to fit business logic ...for how it works check the docs page under the
// signup section to know how it implements it own logic.

const express = require('express');
const router = express.Router();
const fuctionForAccount = require('./functionsforaccount');
const dbLogic = require('../../model/signUp');
const mysql = require('mysql');
require('dotenv').config();
const process = require('process');
const jsonToken= require('jsonwebtoken');
const dbConnection= mysql.createConnection(dbLogic.options)


router.post('/signUp', (req, res) => {

    const userInput = req.body; const firstName = req.body.firstName; const lastName = req.body.lastName;
    const middleName = req.body.otherName; const country = req.body.country; const username = req.body.username;
    const password = req.body.password; const emailaddress = req.body.emailAddress; const gender = req.body.gender;

    if (firstName === undefined || lastName === undefined
        || country === undefined || username === undefined
        || gender === undefined || emailaddress === undefined
    ) {
        res.send('please fill in your details properly')
    }

    else if (middleName === undefined) {

        if (!fuctionForAccount.names(firstName) || !fuctionForAccount.names(lastName)
            || !fuctionForAccount.findCountry(country)
            || !fuctionForAccount.passwordCheck(password) || !fuctionForAccount.yesChecker(gender)) {

            res.send('please fill in your details properly');

        }
        else {
          // this response here goes to the client
          const decodedUsername= jsonToken.verify(username,process.Token_for_username);
          const email= jsonToken.verify(emailaddress,process.Token_for_username)
        }
    }

    //  IF MIDDLENAME IS PART OF THE FORM SUBMITTED
    else if (firstName && lastName && middleName
        && country && username && password &&
        emailaddress && gender) {
        if (!fuctionForAccount.names(firstName) || !fuctionForAccount.names(lastName)
            || !fuctionForAccount.names(middleName) || !fuctionForAccount.findCountry(country)
            || !fuctionForAccount.passwordCheck(password)
            || !fuctionForAccount.yesChecker(gender)) {

            res.send('please fill in your details properly');

        } else {
           // this response here goes to the client
        }
    }


});



router.post('/email_token', (req, res) => {
    const email = req.body.email;
    const domain = fuctionForAccount.splitter(email);
    if (typeof domain === 'string') {
        fuctionForAccount.dnsResolverMx(domain).then((result) => {
        dbConnection.query(dbLogic.emailCheck,[email],function(error,result,fields){
            if (error) {
                console.log(error.sqlMessage);
                res.send(error.sqlMessage);
            } else if(result.length <= 0) {
              const token= jsonToken.sign({
                    data: `${email}`
                },process.env.Token_for_email)
                res.send(token)
            }  else{
                res.send('email already registered');
            }
        })
        }).catch((err) => { 
            console.log(err);
            res.send(err.message);
        })
    }else{
        res.send('email format not valid')
    }
});


router.post('/username_check',(req,res)=>{
    const username= req.body.username
    if (fuctionForAccount.userNameCheck(username)) {
        dbConnection.query(dbLogic.usernameCheck,[username],function(error,result,fields) {
            if (error) {
                console.log(error.sqlMessage);
                res.send(error.sqlMessage);
            } else if(result.length <= 0) {
              const token= jsonToken.sign({
                    data: `${username}`
                },process.env.Token_for_username)
                res.send(token)
            }  else{
                res.send(`username: ${ username} already taken`);
            }
        })
    }else{
        res.send('username not a valid format')
    }
    
});


module.exports = router;