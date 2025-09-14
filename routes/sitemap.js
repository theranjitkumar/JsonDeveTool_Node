const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const blogData = require('../data/blogs');
const { ads } = require('../data/ads');

// Function to fetch slugs from the blog data
const getSlugs = async () => {
    try {
        // Convert blogData object to array of blog entries
        const blogEntries = Object.values(blogData);
        const blogSlugs = blogEntries.map(blog => ({
            type: 'blog',
            slug: blog.slug,
            priority: '0.8'
        }));

        // Add ads to the sitemap
        const adSlugs = ads.map(ad => ({
            type: '',  // Remove 'ad/' from the URL
            slug: ad.slug,
            priority: '0.7'
        }));

        const allSlugs = [...blogSlugs, ...adSlugs];
        return allSlugs;
    } catch (error) {
        console.error('Error in getSlugs:', error);
        return [];
    }
};

router.get('/sitemap.xml', async (req, res) => {
    try {
        const slugs = await getSlugs();
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        slugs.forEach(({ type, slug, priority }) => {
            sitemap += `  <url>\n`;
            // Handle empty type (for ads) by not adding an extra slash
            const urlPath = type ? `${type}/${slug}` : slug;
            sitemap += `    <loc>${baseUrl}/${urlPath}</loc>\n`;
            sitemap += `    <changefreq>weekly</changefreq>\n`;
            sitemap += `    <priority>${priority || '0.5'}</priority>\n`;
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
