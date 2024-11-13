// authRoleid.js
const authRoleId = (requiredRoleId) => {
    return (req, res, next) => {
        if (req.user && req.user.role_id === requiredRoleId) {
            next(); // Grant access if role_id matches
        } else {
            res.status(403).send("Access denied"); // Deny access if role_id does not match
        }
    };
};

module.exports = authRoleId;
