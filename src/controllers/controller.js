const axios = require("axios");
const mongoose = require('mongoose');
const cryptoModel = require("../model/cryptoModel");
const model = require("../model/cryptoModel")

// api key = 76a74b6d-e553-4813-a417-7440fdbcb05c

const coins = async function (req, res) {
    try {
        let options = {
            method: "get",
            url: "https://api.coincap.io/v2/assets",
        }
        let response = await axios(options)
        let coins = response.data.data;
    for (i = 0; i < coins.length; i++) {
      let coin = {
        symbol: coins[i].symbol,
        name: coins[i].name,
        marketCapUsd: coins[i].marketCapUsd,
        priceUsd: coins[i].priceUsd
      };

      await cryptoModel.findOneAndUpdate({ symbol: coins[i].symbol }, coin, { upsert: true, new: true } );
    }
    coins.sort( function (a, b) { return b.changePercent24Hr - a.changePercent24Hr; });

    res.status(200).send({ status: true, data: coins });
    }
    catch (error) {
        res.status(400).send({ msg: "some error accurd", err: error })
    }
}

// console.log(array)
// let keys=["symbol","name","marketCapUsd","priceUsd"];
// let values = [];
// for(let i=0;i<array.length;i++){
//     let result = {}
//     for(let j=0;j<keys.length;j++){
//     result.keys[j] = array[i].keys[j]
//     }
//     values.push(result)
// }
// console.log(values)



// let result = coinData.data
//         let array = result.data
//         let sorted = array.sort((a, b) => b.changePercent24Hr - a.changePercent24Hr)

//         for (let i = 0; i < sorted.length; i++) {
//             let result = {
//                 symbol: sorted[i].symbol,
//                 name: sorted[i].name,
//                 marketCapUsd: sorted[i].marketCapUsd,
//                 priceUsd: sorted[i].priceUsd
//             }
//             // let abc = await cryptoModel.create(result)
//             await cryptoModel.findOneAndUpdate({ symbol: coins[i].symbol },sorted[i], { upsert: true, new: true } );
//         }
//         let finalResult = await cryptoModel.find()
//         res.status(200).send(finalResult)
//     }



module.exports.coins = coins
