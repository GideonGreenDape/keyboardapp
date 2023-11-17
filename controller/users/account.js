// This page implement it's own signup logic and, not using any form validator and it sanitizes
// user's details to the best of it logic to fit business logic ...for how it works check the docs page under the
// signup section to know how it implements it own logic.

const express = require('express');
const router = express.Router();
const fuctionForAccount= require('./functionsforaccount');


router.post('/signUp', (req, res) => {

    const userInput = req.body;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const middleName = req.body.otherName;
    const country = req.body.country;
    const username = req.body.username;
    const password = req.body.password;
    const emailaddress = req.body.emailAddress;
    const gender = req.body.gender;
    
    if (firstName === undefined || lastName === undefined
        || country === undefined || username === undefined
        || gender === undefined || emailaddress === undefined
    ) {
        res.send('please fill in your details properly')
    }

    else if (middleName === undefined) {

        if (!fuctionForAccount.names(firstName) || !fuctionForAccount.names(lastName) 
            || !fuctionForAccount.findCountry(country) || !fuctionForAccount.userNameCheck(username) 
            || !fuctionForAccount.passwordCheck(password) || !fuctionForAccount.yesChecker(gender)) {
               
            res.send('please fill in your details properly');

        } else {

            const domain=fuctionForAccount.splitter(emailaddress);
            if (typeof domain=== 'string') {
                fuctionForAccount.dnsResolverMx(domain).then((value) => {
                    res.send(`successfuly signed up ${username}`)
                }).catch((err) => {
                    if (err.code === 'ECONNREFUSED') {
                        res.send('our server is currently having a downtime');
                    }
                    else if(err.code==='ENODATA'){
                        res.send('this mail is not affiliated to any mail server');
                    }
                    else{
                        res.send('contact our support team');
                    }
                })
            } else {
                res.send('the email you entered is invalid')
            }
        }
        }


    else if (firstName && lastName && middleName
        && country && username && password &&
        emailaddress && gender) {
        if (!fuctionForAccount.names(firstName) || !fuctionForAccount.names(lastName) 
            || !fuctionForAccount.names(middleName) || !fuctionForAccount.findCountry(country) 
            || !fuctionForAccount.userNameCheck(username) || !fuctionForAccount.passwordCheck(password) 
            || !fuctionForAccount.yesChecker(gender)) {
               
            res.send('please fill in your details properly');

        } else {

            const domain=fuctionForAccount.splitter(emailaddress);
            if (typeof domain=== 'string') {
                fuctionForAccount.dnsResolverMx(domain).then((value) => {
                    res.send(`successfuly signed up ${username}`)
                }).catch((err) => {
                    if (err.code === 'ECONNREFUSED') {
                        res.send('our server is currently having a downtime');
                    }
                    else if(err.code==='ENODATA'){
                        res.send('this mail is not affiliated to any mail server');
                    }
                    else{
                        res.send('contact our support team');
                    }
                })
            } else {
                res.send('the email you entered is invalid');
            }
        }
    }


});


module.exports = router;