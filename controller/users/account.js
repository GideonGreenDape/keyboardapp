// This page implement it's own signup logic and, not using any form validator and it sanitizes
// user's details to the best of it logic to fit business logic ...for how it works check the docs page under the
// signup section to know how it implements it own logic.

const express = require('express');
const router = express.Router();
const fuctionForAccount = require('./functionsforaccount');
const dbLogic = require('../../model/signUp');


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
            || !fuctionForAccount.findCountry(country) || !fuctionForAccount.userNameCheck(username)
            || !fuctionForAccount.passwordCheck(password) || !fuctionForAccount.yesChecker(gender)) {

            res.send('please fill in your details properly');

        }
        else {

            const domain = fuctionForAccount.splitter(emailaddress);
            if (typeof domain === 'string') {
                fuctionForAccount.dnsResolverMx(domain).then((value) => {
                    const statement1 = dbLogic.statement1;
                    const statement2 = dbLogic.statement2;
                    const statement3 = dbLogic.statement3;
                    const query1 = dbLogic.queryValue1(emailaddress, username, 'false');
                    const query2 = dbLogic.queryValue2(emailaddress, password, username);
                    const query3a = dbLogic.queryValue3a(username, emailaddress, firstName, lastName, middleName, password, country, gender, 'false');
                    dbLogic.dbStorageLogic(statement1, query1, statement2, query2, statement3, query3a);
                }).catch((err) => {
                    if (err.code === 'ECONNREFUSED') {
                        res.send('our server is currently having a downtime');
                    }
                    else if (err.code === 'ENODATA') {
                        res.send('this mail is not affiliated to any mail server');
                    }
                    else {
                        res.send('contact our support team');
                    }
                })
            } else {
                res.send('the email you entered is invalid')
            }
        }
    }

    //  IF MIDDLENAME IS PART OF THE FORM SUBMITTED
    else if (firstName && lastName && middleName
        && country && username && password &&
        emailaddress && gender) {
        if (!fuctionForAccount.names(firstName) || !fuctionForAccount.names(lastName)
            || !fuctionForAccount.names(middleName) || !fuctionForAccount.findCountry(country)
            || !fuctionForAccount.userNameCheck(username) || !fuctionForAccount.passwordCheck(password)
            || !fuctionForAccount.yesChecker(gender)) {

            res.send('please fill in your details properly');

        } else {

            const domain = fuctionForAccount.splitter(emailaddress);
            if (typeof domain === 'string') {
                fuctionForAccount.dnsResolverMx(domain).then((value) => {
                    // response will be sent from here to the client
                    const statement1 = dbLogic.statement1;
                    const statement2 = dbLogic.statement2;
                    const statement3 = dbLogic.statement3;
                    const query1 = dbLogic.queryValue1(emailaddress, username, 'false');
                    const query2 = dbLogic.queryValue2(emailaddress, password, username);
                    const query3b = dbLogic.queryValue3a(username, emailaddress, firstName, lastName, middleName, password, country, gender, 'false');
                    dbLogic.dbStorageLogic(statement1, query1, statement2, query2, statement3, query3b);
                }).catch((err) => {
                    if (err.code === 'ECONNREFUSED') {
                        res.send('our server is currently having a downtime');
                    }
                    else if (err.code === 'ENODATA') {
                        res.send('this mail is not affiliated to any mail server');
                    }
                    else {
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