const express = require("express");
const app = express();

const newsRoutes = require("./src/routes/news.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the News API");
})
app.use("/api/news", newsRoutes);

const PORT = process.env.PORT || 3232;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
