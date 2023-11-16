const dns = require('dns');


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
        || numberCheck === false
        || !alphabet || whiteSpaceTest || lengthCheck < 4) {
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
 * @returns {boolean}
 */


function splitter(emailaddress) {
    const symbolTest = /[#!~`%^*&\-=+<>{}\]\[]/.test(emailaddress);
    const alphabet = /^[a-zA-Z\u4e00-\u9fa5]/.test(emailaddress);
    const atTest = /@/.test(emailaddress);
    const whiteSpaceTest = /\s/.test(emailaddress);
    if (symbolTest || !alphabet || whiteSpaceTest || !atTest) {
        return false
    }
    else{
        const [mail, value] = emailaddress.split('@');
        return value;
    }
}


function dnsResolverMx(splitted) {
    return new Promise((resolve, reject) => {
         try {
             setTimeout(() => {
                 dns.resolveMx(splitted, (err, addresses) => {
                     if (err) {
                         reject(err)
                     }
                     resolve(addresses)
                 })
             }, 3000)
         } catch (error) {
             console.log(error)
         }
     })
 
 }


 /**
 * 
 * @param {string} entry 
 * @returns {boolean}
 */


function yesChecker(entry) {
    if (entry.toLocaleLowerCase() === 'male') {
        return true
    } else {
        return false
    }
}

module.exports={
    countrylist,
    passwordCheck,
    userNameCheck,
    findCountry,
    names,
    splitter,
    dnsResolverMx,
    yesChecker
}