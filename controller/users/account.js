
const express= require('express');

const router= express.Router();


const country=[]


/**
 * 
 * @param {string} username - userinput to be validated
 * @returns {boolean} - This return true or false if the username pass the validation test
 */

function passwordCheck(password){
    const passwordlength= password.length;
    const regextest = /\d/.test(password);
    const alphabetTest= /[a-zA-Z\u4e00-\u9fa5]/.test(password);
    if (passwordlength>6 && regextest && alphabetTest) {
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
function userNameCheck(username){
  const alphaNumeric= /[a-zA-Z\u4e00-\u9fa5]/.test(username);
  const numberCheck= /\d/.test(username);
  const symbolCheck= /[!@#$%^&*|]/.test(username);
  const specialCharacter=/[;'-()<>{}=+`~\\/]/.test(username)
  const lengthCheck= username.length;
   if (alphaNumeric===false && symbolCheck===true && specialCharacter===true && lengthCheck < 6 && numberCheck===false) {
       return false;                                          
   } else {
       return true;
   }
}


router.post('/signUp',(req,res)=>{
   const userInput= req.body;
   const length= Object.keys(userInput).length;
   const firstName=req.body.firstName;
   const lastName=req.body.lastName;
   const middleName=req.body.middleName;
   const country= req.body.country;
   const username= req.body.username;
   const password= req.body.password;
   const emailaddress=req.body.emailaddress;
   const gender= req.body.gender;
   const consent= req.body.consent;
   const communication=req.body.communicationPreference;
   //quick check to reduce response time and resource

   if (length<9) {
      res.send('please fill the form completely')
   }else{
    try {
        if (userNameCheck(username)) {
            res.send('username perfect!')
        } else {
            res.send('username not following suit!')
        }
    } catch (error) {
        
    }
   }
   
});



module.exports= router;