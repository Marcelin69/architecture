const { PrismaClient } = require("../../generated/prisma");

const prisma = new PrismaClient();

class NewsService {
  getNews = async () => {
    const news = await prisma.email.findMany();
    return news;
  };
  addNews = async (news) => {
    if (!news) {
      throw new Error("Email is required");
    }
    const newNews = await prisma.email.create({
      data: {
        email: news,
      },
    });

    return newNews;
  };
}

module.exports = new NewsService();
