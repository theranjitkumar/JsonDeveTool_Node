const comments = require('../data/api/comments');

exports.create = async (req, res) => {
    const comment = req.body;
    comments.push(comment); // Add new comment to array
    res.status(201).json({
        message: 'Comment created',
        comment,
    });
};

exports.getAll = async (req, res) => {
    res.json({
        message: 'All Comments',
        comments,
    });
};

exports.getById = async (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === parseInt(id));
    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({
        message: `Comment with ID: ${id}`,
        comment,
    });
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const index = comments.findIndex(c => c.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    comments[index] = req.body; // Replace full comment
    res.json({
        message: `Comment with ID: ${id} updated`,
        comment: comments[index],
    });
};

exports.patch = async (req, res) => {
    const { id } = req.params;
    const index = comments.findIndex(c => c.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    comments[index] = { ...comments[index], ...req.body }; // Merge fields
    res.json({
        message: `Comment with ID: ${id} patched`,
        comment: comments[index],
    });
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    const index = comments.findIndex(c => c.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    const deleted = comments.splice(index, 1); // Remove from array
    res.json({
        message: `Comment with ID: ${id} deleted`,
        deleted: deleted[0],
    });
};
