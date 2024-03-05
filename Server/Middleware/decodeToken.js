const jwt = require("jsonwebtoken");
const secretkey = '#jin@l#gol@';

const decodeToken = async (token) => {
    try {
        // const token = req.headers.authorization;
        const decode= jwt.verify(token, secretkey);
        return decode
    } catch (error) {
        res.status(401).send(error);
        return null;
    }
};
module.exports = decodeToken