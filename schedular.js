var schedule = require('node-schedule');
var marketUpdate = require('./marketUpdate.js');
var emailSystem = require('./email.js');
var config = require('./config.js');

var timer = config.sendValue('nodeScheduleTimer');
var stock = config.getStockList();

exports.timer = function(){
    return schedule.scheduleJob(timer, function(){

        console.log("-----schedule job is triggered.--- ", )
        var date = new Date();
        var t = date.getHours() + ' : ' + date.getMinutes();
        console.log("time call triggered on ", t);

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
