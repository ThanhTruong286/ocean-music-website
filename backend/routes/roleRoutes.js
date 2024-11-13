// roleRoutes.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const authRole = require('../middlewares/authRoleid');

// Route to get all roles
router.get('/', roleController.getAllRoles);

// Route to create a new role
router.post('/', roleController.createRole);

// Route to update a role by ID
router.put('/:id', roleController.updateRole);

// Route to delete a role by ID
router.delete('/:id', roleController.deleteRole);
router.get('/admin', authRole([1, 5]), (req, res) => {
    res.send("Chào mừng đến với Bảng Điều Khiển Admin");
});

// Ví dụ: cho phép cả vai trò Admin và User thường (role_id 1 và 2)
router.get('/user-profile', authRole([1, 2]), (req, res) => {
    res.send("Chào mừng đến với Hồ sơ người dùng");
});

module.exports = router;
