const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

var port = 4500;
var weatherArray = {};

app.get("/", async function(req, res,){
    res.sendFile(__dirname+"/index.html")
    return
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Meerbusch&units=metric&appid=64941f0b2cc7c6b39da89200dc147c3b";
    https.get(url, function request(res2){
        console.log(res2.statusCode);
        res2.on("data", function(data){
            const weatherData = JSON.parse(data);
            //stringify: string in one line
            console.log(weatherData); 
            const temp = weatherData.main.temp
            weatherArray.temp = temp;
            console.log(temp);
            const desc = weatherData.weather[0].description
            weatherArray.desc = desc;
            console.log(desc);
            const icon = weatherData.weather[0].icon
            weatherArray.imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            // USE OF WRITE AND THEN SEND BLANK AT THE END
            // learn about async and global functions and variables/consts
        });
    });
    // res.send(
    // "<h1>The temperature in Meerbusch is " + weatherArray.temp + " degrees celcius.<br>Description: " + weatherArray.desc + ".<br><img src="+weatherArray.imgURL+"></h1>");
    
    // console.log(desc);
    // res.send("Server is up."); 
});
app.post("/info", function(req, res){
    console.log(req.body)
    //res.write("Thanks for sending us your information. (Waitline)");
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+req.body.city+"&units="+req.body.unit+"&appid=64941f0b2cc7c6b39da89200dc147c3b";
    weatherArray.city = req.body.city;
    weatherArray.unit = req.body.unit;

    console.log(weatherArray.city);
    
    //res.status(200).json({acc_exists: weatherArray})
    
    https.get(url, function request(res2){
        console.log(res2.statusCode);
        res2.on("data", function(data){
            try {
            const weatherData = JSON.parse(data);
            //stringify: string in one line
            console.log(weatherData); 
            const temp = weatherData.main.temp
            weatherArray.temp = temp;
            console.log(temp);
            const desc = weatherData.weather[0].description
            weatherArray.desc = desc;
            console.log(desc);
            const icon = weatherData.weather[0].icon
            weatherArray.imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            } catch (err){res.send("There is an error with your city, check for typos: "+err); return;}
            // USE OF WRITE AND THEN SEND BLANK AT THE END
            // learn about async and global functions and variables/consts
            res.send(
                "<h1>The temperature in "+weatherArray.city+ " is " + weatherArray.temp + " degrees "+degree+".<br>Description is: " + weatherArray.desc + ".<br><img src="+weatherArray.imgURL+"></h1>");
        });
    });
    if (weatherArray.unit === "metric") 
    {var degree = "celcius"
    } else if (weatherArray.unit === "imperial") {
        var degree = "fahrenheit";
    } else {
        var degree = "kelvin";
    }
    console.log(degree);
    // res.send(
    // "<h1>The temperature in "+weatherArray.city+ " is " + weatherArray.temp + " degrees "+degree+".<br>Description is: " + weatherArray.desc + ".<br><img src="+weatherArray.imgURL+"></h1>");
})

app.listen(port, function() {
    console.log("Server started on port "+ port);
});