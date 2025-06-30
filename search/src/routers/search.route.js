const express = require('express');
const {search} = require('../controllers/search.controller');

const router = express.Router();

// Exemple de route de recherche
router.get('/search', search);

module.exports = router;