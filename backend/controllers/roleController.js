// roleController.js
const RoleModel = require('../models/Role');

// Get all roles
exports.getAllRoles = (req, res) => {
    RoleModel.getAllRoles((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching roles' });
        }
        res.json(results);
    });
};

// Create a new role
exports.createRole = (req, res) => {
    const roleData = req.body; // Assuming role data is sent in the request body
    if (!roleData.role_name) {
        return res.status(400).json({ message: 'Role name is required' });
    }

    RoleModel.createRole(roleData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating role' });
        }
        res.status(201).json({ message: 'Role created', roleId: result.insertId });
    });
};

// Update a role by ID
exports.updateRole = (req, res) => {
    const roleId = req.params.id; // Get role ID from URL
    const roleData = req.body; // Assuming role data is sent in the request body

    if (!roleData.role_name) {
        return res.status(400).json({ message: 'Role name is required' });
    }

    RoleModel.updateRole(roleId, roleData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating role' });
        }
        res.json({ message: 'Role updated' });
    });
};

// Delete a role by ID
exports.deleteRole = (req, res) => {
    const roleId = req.params.id; // Get role ID from URL

    RoleModel.deleteRole(roleId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting role' });
        }
        res.json({ message: 'Role deleted' });
    });
};
