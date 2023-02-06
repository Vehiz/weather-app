import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
dotenv.config();
app.use(cors());
app.use(express.json());

// Registering routes
app.get("/", (req, res) => {
    res.status(200).send("Weather API is Running!");
  });  

// Fetching weather forecast for a particular city
app.get("/weather", async (req, res) => {
  if (!req.query.city) {
    res.status(404).json("City is missing");
  } else {
    let city = req.query.city;
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`
    );

    const data = await response.json();
    res.status(200).json(data);
  }
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
