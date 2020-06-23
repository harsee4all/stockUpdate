// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
var config = require('./config.js');
var alert = require('alert-node');

var gridAPI = config.sendValue('sendGridAPI');
sgMail.setApiKey(gridAPI);

var cell = config.sendValue('cellNo');
var cellbackside = config.sendValue('cellCarrier');

exports.textMsg = function(stocks){

  console.log(" finalize what you want ", stocks)
   var text = '';
   stocks.forEach(element => {
     text = ' ' + text + element.stock + ' = ' + element.sharePrice + ' Profit is ' + element.profit + ' '
   });
    alert(text);

    // const msg = {
    //     // to: '4236820447@txt.att.net',
    //     to: cell + '@' + cellbackside,
    //     from: 'harshpatel2589@gmail.com',
    //     subject: 'Stock Price Update',
    //     text: JSON.stringify(stocks)
    //   };
      // console.log(msg);
    // sgMail.send(msg);

}