var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function (req, res, next) {
    res.render('index', {
        title: 'Home',
        description: 'Free online JSON formatter and viewer. Use dummy APIs for testing your frontend apps. Fast, reliable developer tools at JSON Dev Tool.',
        keywords: 'JSON, Dev Tool, Viewer, Manipulator, Formater',
        author: 'Jsone Dev Tool',

        metaOgType: 'website',
        metaOgTitle: 'Jsone Dev Tool',
        metaOgDescription: 'Free online JSON formatter and viewer. Use dummy APIs for testing your frontend apps. Fast, reliable developer tools at JSON Dev Tool.',
        metaOgImage: '/img/jsondt.png',
        metaOgUrl: 'https://jsondevtool.com',
        metaTwitterCard: '/img/jsondt.png'
    });
});


router.get('/', function (req, res, next) {
    const jsonData = {
        name: "John Doe",
        age: 30,
        isAdmin: true,
        address: {
            street: "123 Main St",
            city: "New York"
        }
    };
    res.render('editor', {
        layout: 'editor',
        title: 'JSON Viewer',
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

router.get('/dummyapis', function (req, res, next) {
    res.render('dummyapis', {
        title: 'Dummy APIs',

        description: 'Access free dummy APIs for users, blogs, and comments. Perfect for frontend testing and prototyping without a real backend. No signup required.',
        keywords: 'JSON, Dev Tool, Viewer, Manipulator, Formater',
        author: 'Jsone Dev Tool',

        metaOgType: 'website',
        metaOgTitle: 'Jsone Dev Tool',
        metaOgDescription: 'Access free dummy APIs for users, blogs, and comments. Perfect for frontend testing and prototyping without a real backend. No signup required.',
        metaOgImage: '/img/jsondt.png',
        metaOgUrl: 'https://jsondevtool.com',
        metaTwitterCard: '/img/jsondt.png'
    });
});

router.get('/apidocs', function (req, res, next) {
    res.render('apidocs', {
        title: 'API Docs',

        description: 'A tool for viewing, manipulating and Formating JSON data.',
        keywords: 'JSON, Dev Tool, Viewer, Manipulator, Formater',
        author: 'Jsone Dev Tool',

        metaOgType: 'website',
        metaOgTitle: 'Jsone Dev Tool',
        metaOgDescription: 'A tool for viewing, manipulating and Formating JSON data.',
        metaOgImage: '/img/jsondt.png',
        metaOgUrl: 'https://jsondevtool.com',
        metaTwitterCard: '/img/jsondt.png'
    });
});

module.exports = router;
