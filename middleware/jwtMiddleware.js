

const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  console.log(`Inside JWT Middleware`);

  if (!req.headers["authorization"]) {
    return res.status(404).json("Authorization failed...Token is missing!!!");
  }

  const token = req.headers["authorization"].split(" ")[1];
  console.log("Received Token:", token);

  if (token) {
    try {
      const jwtResponse = jwt.verify(token, process.env.JWTPASSWORD);
      console.log("Decoded JWT:", jwtResponse); // Debugging

      req.userId = jwtResponse.userId;
      req.role = jwtResponse.role || "student"; // Default to "student" if undefined

      console.log("Extracted Role:", req.role); // Debugging
      next();
    } catch (err) {
      return res.status(404).json("Authorization failed...please login!!!");
    }
  } else {
    return res.status(404).json("Authorization failed...Token is missing!!!");
  }
};

module.exports = jwtMiddleware;



