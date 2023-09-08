const jwt = require("jsonwebtoken");

exports.Gate = (req, res, next) => {
  const header_token = req.headers["authorization"];

  const token = header_token && header_token.split(" ")[1];

  if (token === null) res.sendStatus(403);
  jwt.verify(token, process.env.SECRET_SERVICE, (err, result) => {
    if (err) console.log(err);
    if (result === undefined) {
        res.send({message: 'ErrorToken'})
    } else {
      next();
    }
  });
};
