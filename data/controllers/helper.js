const sendMail = async function(toaddress,password){
    const send = require('gmail-send')({
        user: 'itsmemani4you@gmail.com',
        pass: '***',
        to:   toaddress,
        subject: 'Food Factory - Password reset',
      });
  send({
    text:    `The newly generated password for your account is ${password} .Please Login and change your password`,  
  }, (error, result, fullResult) => {
    if (error) console.error(error);
    console.log(result);
    
  })
}

module.exports = {
    sendMail
}