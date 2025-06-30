const express = require("express");
const searchRouter = require("./src/routers/search.route");
const path = require("path");

const app = express();
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send(
    `<h1>Welcome to the Search API</h1>
     <p>Use the <a href="/api/search">/api/search</a> endpoint to perform searches.</p>`
  );
});

app.use("/api/search", searchRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
