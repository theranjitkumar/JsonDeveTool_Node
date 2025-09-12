var express = require('express');
var router = express.Router();
const blogArticles = require('../data/blogs.js');

router.get('/', function (req, res, next) {
  console.log('Blog route hit!');
  // Get featured article (first one with featured: true)
  const featuredArticle = blogArticles.find(article => article.featured);
  console.log('Featured article:', featuredArticle ? 'found' : 'not found');

  // Get all articles except the featured one
  const articles = blogArticles.filter(article => !article.featured);
  console.log('Number of articles:', articles.length);

  res.render('blog', {
    title: 'Blog - ModernTech Academy',
    description: 'Stay updated with the latest tutorials, industry insights, and success stories from ModernTech Academy.',
    featuredArticle,
    articles,
    keywords: 'blog, programming tutorials, web development, data science, cloud computing, tech news, career advice',
    metaOgType: 'website',
    metaOgTitle: 'ModernTech Academy Blog - Tech Insights & Tutorials',
    metaOgDescription: 'Explore our collection of articles, tutorials, and industry insights on programming, data science, cloud computing, and more.',
    metaOgImage: 'https://moderntechacademy.com/img/favicon/logo.png',
    metaOgUrl: 'https://moderntechacademy.com/blog',
    metaCanonical: 'https://moderntechacademy.com/blog',
    // currentPage: '/blog'
  });
});

// Blog article route
router.get('/:slug', function (req, res, next) {
  const article = blogArticles.find(a => a.slug === req.params.slug);

  if (!article) {
    return next(); // 404
  }

  // Get related articles (excluding current article)
  const relatedArticles = blogArticles
    .filter(a => a.slug !== article.slug)
    .slice(0, 3);

  res.render('blog-details', {
    title: `${article.title} | ModernTech Academy Blog`,
    description: article.content.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...',
    keywords: article.tags.join(', '),
    metaOgType: 'article',
    metaOgTitle: article.title,
    metaOgDescription: article.content.replace(/<[^>]*>?/gm, '').substring(0, 300) + '...',
    metaOgImage: article.featuredImage,
    metaOgUrl: `https://moderntechacademy.com/blog/${article.slug}`,
    metaCanonical: `https://moderntechacademy.com/blog/${article.slug}`,
    article,
    relatedArticles
  });
});

module.exports = router;
