
const isAdmin = (req, res, next) => {
    const { role } = req.userInfo;
    if (role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied, you are not an admin.'
        });
    }
    next();
}

module.exports = isAdmin;