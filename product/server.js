const express = require("express");
const productRoute = require("./src/routes/product.route");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3030;
// Middleware pour parser le JSON
app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Route de test
app.get("/", (req, res) => {
  res.send("Serveur Product opérationnel !");
});

app.use("/api/product", productRoute);



// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
