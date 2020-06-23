
configTemplate = {
    // nodeScheduleTimer : '2/30 9-16 * * 1-5',
    nodeScheduleTimer : '* * * * *',
    cellNo : '4236820447',
    cellCarrier: 'txt.att.net',
    sendGridAPI: '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',
    alphavantageKey : '3G36FX3N5YHOSWKE'
}

exports.sendValue = function(value){
    return configTemplate[value];
}

stockListBasePrice = [ 
    { stock: 'F', price: 5.96, noOfShare: 480 },
    { stock: 'MAXR', price: 5.72, noOfShare: 112 }
]
exports.getStockList = function() {
    var result = [];
    stockListBasePrice.forEach(e => {
        result.push(e.stock)
    });
    return result;
}

var publishReport = [];

exports.checkCondition = function(detailObject){
    publishReport = [];
    for(var x = 0; x < detailObject.length; x++){
      conditionalFunction(detailObject[x]);    
    }

    return publishReport;
}

conditionalFunction = function(singleStockDetail){
    // console.log("check what API is sending ", singleStockDetail)
    var picked = stockListBasePrice.find(one => one.stock === singleStockDetail.stock);

    if(picked && singleStockDetail.price >=  picked.price){
        picked.priceDifference = singleStockDetail.price - picked.price;
        picked.priceDifference = parseFloat(picked.priceDifference).toFixed(2) * 1; // convert into number with 2 decimal points
        picked.sharePrice =  parseFloat(singleStockDetail.price).toFixed(2) * 1; // convert into number with 2 decimal points
        picked.purchasePrice = picked.price * picked.noOfShare;
        picked.currentValue = picked.sharePrice * picked.noOfShare;
        picked.profit = picked.currentValue - picked.purchasePrice;
        picked.profit = parseFloat(picked.profit).toFixed(2) * 1; // convert into number with 2 decimal points
        // console.log("its time to sell the stock ", picked)
        publishReport.push(picked);
    }
    else {
        publishReport.push(singleStockDetail);
    }
}
