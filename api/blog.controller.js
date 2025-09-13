const blogs = require('../data/api/blogs.js');

exports.create = async (req, res) => {
    const blog = req.body;
    blogs.push(blog);
    res.status(201).json({
        message: 'Blog created',
        blog,
    });
};

exports.getAll = async (req, res) => {
    res.json({
        message: 'All Blogs',
        blogs,
    });
};

exports.getById = async (req, res) => {
    const { id } = req.params;
    const blog = blogs.find(b => b.id === parseInt(id));
    if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({
        message: `Blog with ID: ${id}`,
        blog,
    });
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const index = blogs.findIndex(b => b.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: 'Blog not found' });
    }
    blogs[index] = req.body; // Replace entire blog
    res.json({
        message: `Blog with ID: ${id} updated`,
        blog: blogs[index],
    });
};

exports.patch = async (req, res) => {
    const { id } = req.params;
    const index = blogs.findIndex(b => b.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: 'Blog not found' });
    }
    blogs[index] = { ...blogs[index], ...req.body }; // Merge updates
    res.json({
        message: `Blog with ID: ${id} patched`,
        blog: blogs[index],
    });
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    const index = blogs.findIndex(b => b.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: 'Blog not found' });
    }
    const deleted = blogs.splice(index, 1);
    res.json({
        message: `Blog with ID: ${id} deleted`,
        deleted: deleted[0],
    });
};
