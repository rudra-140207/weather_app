import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));


app.listen(4000, () => {
    console.log("server is working");
})

app.get("/", (req, res) => {
    res.render("home")
})


const api_key = process.env.api_key;

app.post("/report", async (req, res) => {
    const { location } = req.body;
   
    try {
        const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}&aqi=yes`,
            {
                method: "GET"
            }
        );

        if (!response.ok) {
            throw new error("API request failed");
        }
        
        var data = await response.json();
        

        res.render("report",{
            Name : data.location.name ,
            State: data.location.region,
            Country: data.location.country,
            Time_Zone: data.location.tz_id,
            Temp_C: data.current.temp_c,
            Temp_F: data.temp_f,
            dayOrNight: data.current.is_day,
            Wind_mph: data.current.wind_mph,
            Wind_kph: data.current.wind_kph,
            wind_degree: data.current.wind_degree,
            precip_mm: data.current.precip_mm,
            humidity: data.current.humidity,
            cloud: data.current.cloud,
            feelslike_c: data.current.feelslike_c,
            feelslike_f: data.current.feelslike_f ,
            pm_2_5 : data.current.air_quality.pm2_5 
        });
    }
    catch (error) {
        console.log(error);
    }
})
