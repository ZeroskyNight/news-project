require("dotenv").config();
const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

app.get("/news", async(req,res)=> {
    // res.send("News Aggregator API is running...");
    try{
        const { query, page = 1} =  req.query;
        const response = await axios.get("https://newsapi.org/v2/top-headlines", {
            params: {
                q: query || "latest",
                pageSize: 5,
                page,
                apiKey: process.env.NEWS_API_KEY
            }
        });
        res.json(response.data.articles);
    } catch (error) {
        res.status(500),json({ error: "Error fetching news"});
    }

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));