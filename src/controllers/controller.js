const axios = require("axios");
const { get } = require("mongoose");

// api key =8adab6e12e616acd700b3a86207e4812

const londonWeathear = async function (req, res) {
    try {
        let abc = req.query.name
        let id = req.query.appid
        console.log(abc)
        console.log(id)
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${abc}&appid=${id}`
        }
        let londonData = await axios(options)
        console.log(londonData)
        let result = londonData.data
        res.status(200).send({ msg: "Successfully fetched data", data: result })
    } catch (error) {
        res.status(500).send({ msg: "Some error occured", error: error })
    }
}

const londonTemprature = async function (req, res) {
    try {
        let abc = req.query.name
        let id = req.query.appid
        console.log(abc)
        console.log(id)
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${abc}&appid=${id}`
        }
        let londonData = await axios(options)
        console.log(londonData)
        let result = londonData.data.main.temp
        res.status(200).send({ msg: "Successfully fetched data", tempratureoflondon: result })
    } catch (error) {
        res.status(500).send({ msg: "Some error occured" })
    }
}
const sortedTemp = async function (req, res) {
    try {
        let id = req.query.appid
        let city = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let cityTemp = []
        for (let i = 0; i < city.length; i++) {
            //    let weather =  await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city[i]}&appid=${id}`)
            let options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${city[i]}&appid=${id}`
            }
            let weather = await axios(options)

            cityTemp.push({ city: city[i], temp: weather.data.main.temp })
        }
        const result = cityTemp.sort((a, b) => a.temp - b.temp)

        res.status(200).send({ msg: result })

    } catch (error) {
        res.status(500).send({ msg: "Some error occured", error: error })
    }
}

module.exports.londonWeathear = londonWeathear
module.exports.londonTemprature = londonTemprature
module.exports.sortedTemp = sortedTemp