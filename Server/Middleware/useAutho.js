const jwt = require("jsonwebtoken");
const secretkey = '#jin@l#gol@';

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
         jwt.verify(token, secretkey , (err) =>{
         err?res.send("you are unauthorized") : next()   
        });
    } catch (error) {
        res.status(401).send(error);
    }
};
module.exports = verifyToken