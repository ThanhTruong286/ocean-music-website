// RoleModel.js
const db = require('../config/db');

class RoleModel {
    static getAllRoles(callback) {
        db.query('SELECT * FROM roles', callback);
    }

    static createRole(roleData, callback) {
        db.query('INSERT INTO roles (role_name) VALUES (?)', [roleData.role_name], callback);
    }

    static updateRole(roleId, roleData, callback) {
        db.query('UPDATE roles SET role_name = ? WHERE role_id = ?', [roleData.role_name, roleId], callback);
    }

    static deleteRole(roleId, callback) {
        db.query('DELETE FROM roles WHERE role_id = ?', [roleId], callback);
    }
}

module.exports = RoleModel;
