// sends mail on the specified mail address with the specified msg 

const mailjet = require('node-mailjet').apiConnect(
    {api_key}, {secret_key}
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