
//if you use the flag it enables INTERACTIVE and disable options that are not 
// yet implemented in Node.js check the doc page to learn more
flag1=['-COMPRESS','CONNECT_WITH_DB','FOUND_ROWS','-IGNORE_SIGPIPE','IGNORE_SPACE','INTERACTIVE',
'TRANSACTION'];

//if you use the flag it disable INTERACTIVE and disable options that are not 
// yet implemented in Node.js check the doc page to learn more
flag2=['-COMPRESS','CONNECT_WITH_DB','FOUND_ROWS','-IGNORE_SIGPIPE','IGNORE_SPACE','-INTERACTIVE',
'TRANSACTION'];

/**
 * 
 * @param {string} username 
 * @param {string} passcode 
 * @param {string} myTimezone 
 * @param {string} timeOut 
 * @param {string} databaseName
 * @param {string}  allowMultipleStatement
 * @param {Array} flags 
 */

function configFunction(username, passcode, databaseName, myTimezone,
    allowMultipleStatement, timeOut, flags) {

    return {
        host: 'localhost',
        port: 3306,
        user: username,
        password: passcode,
        database: databaseName,
        timezone: myTimezone,
        connectTimeout: timeOut,
        insecureAuth: false,
        debug: false,
        localInfile: true,
        multipleStatements: allowMultipleStatement

    };
};


module.exports= {flag1,flag2,configFunction};

// this file is configured to take some configuration from .env