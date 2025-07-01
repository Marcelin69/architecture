const { createProxyMiddleware } = require("http-proxy-middleware");
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;

app.use(require("express").urlencoded({ extended: true }));

const proxyProduct = createProxyMiddleware({
  target: process.env.PRODUCT_SERVICE_URL || "http://localhost:3030",
  changeOrigin: true,
  // pathRewrite: path => path,

  pathRewrite: {
    "^/api/product": "/api/product", // Supprime le préfixe pour qu’il reste `/get-all-products`
  },
  onProxyReq: (proxyReq, req, res) => {
    // You can modify the request here if needed
    console.log(`Proxying request: ${req.method} ${req.url}`);
  },
  onError: (err, req, res) => {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy error");
  },
});
const proxyNewsLetter = createProxyMiddleware({
  target: process.env.NEWSLETTER_SERVICE_URL || "http://localhost:3232",
  changeOrigin: true,
  pathRewrite: {
    "^/api/news": "/api/news",
  },
  onProxyReq: (proxyReq, req, res) => {
    // You can modify the request here if needed
    console.log(`Proxying request: ${req.method} ${req.url}`);
  },
  onError: (err, req, res) => {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy error");
  },
});
// const proxyPanier = createProxyMiddleware({
//   target: "http://localhost:3000",
//   changeOrigin: true,
//   pathRewrite: {
//     "^api/panier/add": "api/panier/add",
//   },
//   onProxyReq: (proxyReq, req, res) => {
//     // You can modify the request here if needed
//     console.log(`Proxying request: ${req.method} ${req.url}`);
//   },
//   onError: (err, req, res) => {
//     console.error("Proxy error:", err);
//     res.status(500).send("Proxy error");
//   },
// });
const proxySearch = createProxyMiddleware({
  target: process.env.SEARCH_SERVICE_URL || "http://localhost:3000",
  changeOrigin: true,
  pathRewrite: {
    "^/api/search": "/api/search",
  },
  onProxyReq: (proxyReq, req, res) => {
    // You can modify the request here if needed
    console.log(`Proxying request: ${req.method} ${req.url}`);
  },
  onError: (err, req, res) => {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy error");
  },
});

app.use("/api/product/get-all-products", proxyProduct);
app.use("/api/product/add-product", proxyProduct);

app.use("/api/news/add-news", proxyNewsLetter);
app.use("/api/news/get-news", proxyNewsLetter);

// app.use("/api/panier/add", proxyPanier);
app.use("/api/search/search", proxySearch);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
