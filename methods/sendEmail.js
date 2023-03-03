// sends mail on the specified mail address with the specified msg 

const mailjet = require('node-mailjet').apiConnect(
  "ed4864c1bfaa9f4def636d4e34b6ef9d",
  "d283715c82e7059aeaef312065bbd351"
  )


module.exports = function(email, token, text, sub, callback){


  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'akshita1219209@jmit.ac.in',
          Name: 'Akshita',
        },
        To: [
          {
            Email: email,
            Name: 'You',
          },
        ],
        Subject: sub,
        TextPart: 'Greetings of the day!',
        HTMLPart:
          `${text}`,
      },
    ],
  })
  request
    .then(result => {
      // console.log(result.body)
      callback(null, result.body);
    })
    .catch(err => {
      // console.log(err);
      callback(err, null);
    })

}