// roleRoutes.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Route to get all roles
router.get('/', roleController.getAllRoles);

// Route to create a new role
router.post('/', roleController.createRole);

// Route to update a role by ID
router.put('/:id', roleController.updateRole);

// Route to delete a role by ID
router.delete('/:id', roleController.deleteRole);

module.exports = router;
