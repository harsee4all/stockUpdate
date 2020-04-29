// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey('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');

exports.textMsg = function(stocks){
    const msg = {
        to: '4236820447@txt.att.net',
        from: 'harshpatel2589@gmail.com',
        subject: 'Sending with Twilio SendGrid',
        text: JSON.stringify(stocks),
      };
      
    sgMail.send(msg);

}