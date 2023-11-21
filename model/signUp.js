require('dotenv').config();
const process = require('process');
const mysqlconfig = require('./mysqlconfigurationfile');
const mysql = require('mysql');


const host = process.env.HOST;
const user = process.env.DB_SIGNUP_ACCOUNT_USERNAME;
const password = process.env.DB_SIGNUP_PASSWORD;
const databaseName = 'keyboard_app';
const timezone = 'local';
const allowMultipleStatement = true;
const connectTimeout = 12000

const mysqlFlags = mysqlconfig.flag2;
const options = mysqlconfig.configFunction(user, password, databaseName, timezone, allowMultipleStatement, connectTimeout, mysqlFlags);

const dbConnection = mysql.createConnection(options);

const statement1 = ` 
INSERT INTO \`keyboard_app\`.\`pre_signup\` set ?
`;
function queryValue1(emailAddress, userName, is_deleted) {
    return {
        email_address: emailAddress,
        username: userName,
        is_deleted: is_deleted
    }
};


const statement2 = `
INSERT INTO \`keyboard_app\`.\`login_check\` set ?
`;

function queryValue2(emailAddress, password, userName) {
    return {
        email_address: emailAddress,
        password: password,
        username: userName
    }
};

const statement3 = `
INSERT INTO \`keyboard_app\`.\`users\` set ?; 
`

function queryValue3a(userName, emailAddress, FirstName, lastName, MiddleName, Password, country, gender, is_deleted) {
    return {
        username: userName,
        email_address: emailAddress,
        first_name: FirstName,
        last_name: lastName,
        middle_name: MiddleName,
        password: Password,
        country: country,
        gender: gender,
        is_deleted: is_deleted,

    }
};

function queryValue3b(userName, emailAddress, FirstName, lastName,Password, country, gender, is_deleted) {
    return {
        username: userName,
        email_address: emailAddress,
        first_name: FirstName,
        last_name: lastName,
        password: Password,
        country: country,
        gender: gender,
        is_deleted: is_deleted,

    }
};

function dbStorageLogic(statement1, query1, statement2, query2, statement3, query3) {

    dbConnection.query(statement1, query1, function (error, result, fields) {
        if (error) {
            if (error.code==='ER_DUP_ENTRY'){
                console.log(error.sqlMessage)
            };
        } else {
            dbConnection.query(statement2, query2, function (error, result, fields) {
                if (error) {
                    console.log(error.code);
                } else {
                    dbConnection.query(statement3, query3, function (error, result, fields) {
                        if (error) {
                            console.log(error.code);
                        }
                        else {
                            console.log('successfull');
                        }
                    })
                }
            })
        }
    })

};




module.exports = { dbStorageLogic, statement1, statement2, statement3, queryValue1, queryValue2, queryValue3a,queryValue3b };



// Response will be sent from here to the client
// db connection first goes to pre_signup...if error is returned..query the type of error and respond appropiately
// if no error in the pre_signup....proceed to store this required data to the users table if error delete console appropiately( i.e by deleting the data stored in the first step )
// if no error proceed to store the required input into the login_check table if error respond appropiately( i.e by deleting the data stored in the second and first step )