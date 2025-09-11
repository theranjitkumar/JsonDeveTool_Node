var express = require('express');
var router = express.Router();

router.get('/blog', function (req, res, next) {
  res.render('editor', {
    // layout: 'editor',
    title: 'Blogs',
    description: 'Use our free JSON Formatter online to view, beautify, and validate JSON instantly. Perfect for developers and testers.',
    keywords: 'JSON, Dev Tool, Viewer, Manipulator, Formater',
    author: 'Jsone Dev Tool',

    metaOgType: 'website',
    metaOgTitle: 'Jsone Dev Tool',
    metaOgDescription: 'Use our free JSON Formatter online to view, beautify, and validate JSON instantly. Perfect for developers and testers.',
    metaOgImage: '/img/jsondt.png',
    metaOgUrl: 'https://jsondevtool.com',
    metaTwitterCard: '/img/jsondt.png',
    json: JSON.stringify(jsonData)
  });
});

module.exports = router;
