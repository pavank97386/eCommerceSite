const jwt = require('jsonwebtoken')

const authenticateToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    jwt.verify(token.split(" ")[1], process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "invalid token" })
        }
        if (decoded.role == "admin") {
            req.userID = decoded.name
            req.role = decoded.role

            next()
        }
        else {
            return res.status(401).json({ message: 'Access denied for users.' });
        }
    })
}

module.exports = ({
    authenticateToken
})