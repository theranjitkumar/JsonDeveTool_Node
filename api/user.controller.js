const users = require('../data/api/users');

exports.create = async (req, res) => {
    const user = req.body;
    users.push(user); // Add new user to the array
    res.status(201).json({
        message: 'User created',
        user,
    });
};

exports.getAll = async (req, res) => {
    res.json({
        message: 'All Users',
        users,
    });
};

exports.getById = async (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ message: 'User not found' }); // Fixed message
    }
    res.json({
        message: `User with ID: ${id}`,
        user,
    });
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    users[index] = req.body; // Replace full user object
    res.json({
        message: `User with ID: ${id} updated`,
        user: users[index],
    });
};

exports.patch = async (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    users[index] = { ...users[index], ...req.body }; // Merge patch fields
    res.json({
        message: `User with ID: ${id} patched`,
        user: users[index],
    });
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    const deleted = users.splice(index, 1); // Remove from array
    res.json({
        message: `User with ID: ${id} deleted`,
        deleted: deleted[0],
    });
};
