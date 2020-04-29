
var stockList = ['I', 'MAXR'];
const alpha = require('alphavantage')({ key: '3G36FX3N5YHOSWKE' });

exports.getStockList = function(){
    return stockList;
}


exports.stockUpdate = function(stockName) {
    var stockRes = [];
    return new Promise(function(resolve, reject){

        alpha.data.quote(stockName).then(dataRes => {
            var stockPrice = dataRes['Global Quote']['05. price'];
            stockRes = createObj(stockName, stockPrice);
            resolve(stockRes);
        }),function(error){
            console.log("it is erroring out with following issue ----> ", error)
            reject(error)
        };
       
    })

}


createObj = function(symbol, stockPrice){

    var Obj = {
        stock : symbol,
        price: stockPrice
    }
    return Obj;
}