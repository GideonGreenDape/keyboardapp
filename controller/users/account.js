
const express = require('express');
const dns = require('dns');

const router = express.Router();


const countrylist = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus',
    'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei',
    'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde',
    'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros',
    'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czechia',
    'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor (Timor-Leste)', 'Ecuador', 'Egypt',
    'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
    'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana',
    'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti',
    'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan',
    'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'North Korea', 'South Korea', 'Kosovo',
    'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho',
    'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi',
    'Malaysia', 'Maldives', 'Mali', 'Malta',
    'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia',
    'Montenegro', 'Morocco', 'Mozambique', 'Myanmar(Burma)', 'Namibia',
    'Nauru', 'Nepal', 'Netherlands', 'New Zealand',
    'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia (formerly Macedonia)', 'Norway',
    'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay',
    'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia',
    'Rwanda', 'Saint Kitts and Nevis', 'Saint Vincent and the Grenadines', 'Samoa',
    'SanMarino', 'Sao Tome and Principe',
    'SaudiArabia', 'Senegal', 'Serbia', 'Seychelles',
    'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
    'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka',
    'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo',
    'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
    'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City',
    'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];



/**
 * 
 * @param {string} username - userinput to be validated
 * @returns {boolean} - This return true or false if the username pass the validation test
 */

function passwordCheck(password) {
    const passwordlength = password.length;
    const regextest = /\d/.test(password);
    const alphabetTest = /[a-zA-Z\u4e00-\u9fa5]/.test(password);
    const whiteSpaceTest = /\s/.test(password);
    const uppercaseAlphabetTest = /[A-Z\u4e00-\u9fa5]/.test(password);
    if (passwordlength >= 8 && regextest
        && alphabetTest && uppercaseAlphabetTest
        && whiteSpaceTest === false) {
        return true;
    } else {
        return false;
    }
};

/**
 * 
 * @param {string} username 
 * @returns {boolean}
 */
function userNameCheck(username) {
    const alphabet = /[a-zA-Z\u4e00-\u9fa5]/.test(username);
    const numberCheck = /\d/.test(username);
    const symbolCheck = /[!@#$%^&*|]/.test(username);
    const specialCharacter = /[;'\-()<>{}=+`~\\/]/.test(username)
    const lengthCheck = username.length;
    const whiteSpaceTest = /\s/.test(username);
    if (symbolCheck || specialCharacter
        || numberCheck===false
        || ! alphabet || whiteSpaceTest || lengthCheck < 4) {
        return false;
    } else {
        return true;
    }
}


/**
 * 
 * @param {string} country 
 * @returns {boolean}
 */
function findCountry(country) {
    const foundCountry = countrylist.find((countries) =>
        countries.toLowerCase() === country.toLowerCase());

    if (foundCountry) {
        return true;
    } else {
        return false;
    }
};

/**
 * 
 * @param {string} nameofuser 
 * @returns {boolean}
 */

function names(nameofuser) {
    const digitTest = /\d/.test(nameofuser);
    const symbolTest = /[@#!~`%^*&\-=+<>{}\]\[\\]/.test(nameofuser);
    const lengthTest = nameofuser.length;
    const whiteSpaceTest = /\s/.test(nameofuser);
    if (digitTest || symbolTest || lengthTest < 2 || whiteSpaceTest) {
        return false;
    } else {
        return true;
    }
}

/**
 * 
 * @param {string} emailaddress
 * @returns {string} --true or false is returned 
 */

async function infosearch(value) {

    dns.resolve(value, (error, address) => {
        if (error) {
            return false;
        } else {
            return true;
        }
    })
}


async function dnsLookup(emailaddress) {
    const [mail, value] = emailaddress.split('@');
    const emailReturn = await infosearch(value);
}


function emailVerification(emailaddress) {
    const symbolTest = /[#!~`%^*&\-=+<>{}\]\[]/.test(emailaddress);
    const alphabet = /^[a-zA-Z\u4e00-\u9fa5]/.test(emailaddress);
    const atTest = /@/.test(emailaddress);
    const whiteSpaceTest = /\S/.test(emailaddress);
    if (symbolTest === false && alphabet === true
        && atTest === true && dnsLookup(emailaddress)) {
        return true;
    }
    else {
        return false;
    }

}

/**
 * 
 * @param {string} entry 
 * @returns {boolean}
 */


function yesChecker(entry) {
    if (entry === 'yes') {
        return true
    } else {
        return false
    }
}



router.post('/signUp', (req, res) => {

    const userInput = req.body;
    const length = Object.keys(userInput).length;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const middleName = req.body.otherName;
    const country = req.body.country;
    const username = req.body.username;
    const password = req.body.password;
    const emailaddress = req.body.emailAddress;
    const gender = req.body.gender;
    let vault = [];

    if (firstName === undefined || lastName === undefined
        || country === undefined || username === undefined
        || gender === undefined || emailaddress === undefined
    ) {
        res.send('the details you filled is incorrect')
    }
    else if (middleName === undefined) {
        try {
            vault.push(names(firstName));
            vault.push(names(lastName));
            vault.push(findCountry(country));
            vault.push(userNameCheck(username));
            vault.push(passwordCheck(password));
            vault.push(emailVerification(emailaddress));
            vault.push(yesChecker(gender))
            console.log(vault);
            console.log(vault.length);
            res.send(`you have successfuly signed up ${username}`);
        } catch (error) {
            console.log(vault);
            res.send('please review your details and submit again');
        }
    }
    else if (firstName && lastName && middleName
        && country && username && password &&
        emailaddress && gender) {
        try {
            vault.push(names(firstName));
            vault.push(names(lastName));
            vault.push(names(middleName));
            vault.push(findCountry(country));
            vault.push(userNameCheck(username));
            vault.push(passwordCheck(password));
            vault.push(emailVerification(emailaddress));
            vault.push(yesChecker(gender))
            console.log(vault);
            console.log(vault.length);
            res.send(`you have successfuly signed up ${username}`);
        } catch (error) {
            console.log(vault);
            res.send('please review your details and submit again');
        }
    }


    else {
        res.send(`i hope you get glasses and fill your form properly ${firstName}`);
    }


});


module.exports = router;