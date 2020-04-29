var schedule = require('node-schedule');
var marketUpdate = require('./marketUpdate.js');
var stock = marketUpdate.getStockList();
var emailSystem = require('./email.js');

// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

exports.timer = function(){
    return schedule.scheduleJob('* * * * *', function(){   //every 30 minutes from 9am to 4PM only on Monday to Friday.

        console.log("-----schedule job is triggered.--- ")
        var finalReport = [];
      
        for(var x=0; x< stock.length; x++){
            finalReport.push(marketUpdate.stockUpdate(stock[x]))
        }
      
        Promise.all(finalReport).then(function(publishReport){
            emailSystem.textMsg(publishReport)
        },function(error){
            console.log("Promise all function is throwing some error -----> ", error)
        })
      
    });
}

