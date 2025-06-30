const NewsService = require("../services/news.service");

const getNews = async (req, res) => {
  try {
    const news = await NewsService.getNews();
    res.status(201).json({
      status: "success",
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const addNews = async (req, res) => {
  try {
    const news = req.body;
    const newNews = await NewsService.addNews(news.email);
    res.status(201).json({
      status: "success",
      data: newNews,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
module.exports = { getNews, addNews };
