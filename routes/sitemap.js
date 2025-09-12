const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const blogData = require('../data/blogs');

// Function to fetch slugs from the blog data
const getSlugs = async () => {
    // Convert blogData object to array of blog entries
    const blogEntries = Object.values(blogData);
    const blogSlugs = blogEntries.map(blog => ({
        type: 'blog',
        slug: blog.slug // Using 'slug' to match the blog data structure
    }));

    return blogSlugs;
};

router.get('/sitemap.xml', async (req, res) => {
    try {
        const slugs = await getSlugs();
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        slugs.forEach(({ type, slug }) => {
            sitemap += `  <url>\n`;
            sitemap += `    <loc>${baseUrl}/${type}/${slug}</loc>\n`;
            sitemap += `    <changefreq>weekly</changefreq>\n`;
            sitemap += `    <priority>0.8</priority>\n`;
            sitemap += `  </url>\n`;
        });

        sitemap += `</urlset>`;

        res.header('Content-Type', 'application/xml');
        res.send(sitemap);
    } catch (error) {
        console.error('Error generating sitemap:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
