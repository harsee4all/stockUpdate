
configTemplate = {
    // nodeScheduleTimer : '30 9-16 * * 1-5',
    nodeScheduleTimer : '* * * * *',
    cellNo : '4236820447',
    cellCarrier: 'txt.att.net',
    sendGridAPI: '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',
    alphavantageKey : '3G36FX3N5YHOSWKE'
}

exports.sendValue = function(value){
    return configTemplate[value];
}

stockList = ['F','MAXR'];

stockListBasePrice = [ { stock: 'F', price: '5.00' },
{ stock: 'MAXR', price: '12.75' } ]


exports.getStockList = function() {
    return stockList;
}
var publishReport = [];

exports.checkCondition = function(detailObject){
    // console.log("real values are this ", detailObject)
    publishReport = [];
    for(var x = 0; x < detailObject.length; x++){
      conditionalFunction(detailObject[x]);    
    }
    console.log("final list should be this ", publishReport);
    return publishReport;
}

conditionalFunction = function(singleStockDetail){
    var picked = stockListBasePrice.find(one => one.stock === singleStockDetail.stock);

    if(parseFloat(singleStockDetail.price) >=  parseFloat(picked.price)){
        console.log("its time to sell the stock ", picked)
        picked.priceDifference = parseFloat(singleStockDetail.price) - parseFloat(picked.price);
        publishReport.push(picked);
    }
}
