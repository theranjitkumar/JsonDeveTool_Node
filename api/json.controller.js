const jsonData = require('../data/api/data.json');

exports.getAll = async (req, res) => {
    res.json({
        message: 'Hello from the JSON!',
        data: jsonData,
    });
}

exports.getById = async (req, res) => {
    const { id } = req.params;
    res.json({
        message: `Hello from the JSON with ID: ${id}`,
    });
}
