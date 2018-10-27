const express = require('express');
const router = express.Router();

router.get('/version', (req, res) => {
  res.json({
    version: '1.0.0',
  });
});

module.exports = router;
