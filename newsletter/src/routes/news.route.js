const { getNews, addNews } = require("../controllers/news.controller");

const express = require("express");
const router = express.Router();

router.get("/get-news", getNews);
router.post("/add-news", addNews);

module.exports = router;
