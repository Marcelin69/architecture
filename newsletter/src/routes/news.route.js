const { getNews, addNews } = require("../controllers/news.controller");

const express = require("express");
const router = express.Router();

router.get("/get_news", getNews);
router.post("/add_news", addNews);

module.exports = router;
