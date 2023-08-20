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
    var data = {};
    await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}&aqi=yes`,
        {
            method: "GET"
        }).then(res => res.json()).then(json => (data = json)).catch(e => console.log(e))

    console.log(data);
    res.redirect("/");
})
