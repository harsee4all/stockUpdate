
configTemplate = {
    nodeScheduleTimer : '* * * * *',
    cellNo : '4236820447',
    cellCarrier: 'txt.att.net',
    sendGridAPI: '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',
    alphavantageKey : '3G36FX3N5YHOSWKE'
}

exports.sendValue = function(value){
    return configTemplate[value];
}

stockList = ['I', 'MAXR'];
exports.getStockList = function() {
    return stockList;
}