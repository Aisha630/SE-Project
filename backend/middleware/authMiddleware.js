import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export default function authorize(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.sendStatus(401);
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme != "Bearer") {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      console.log(err);
      return res.sendStatus(401);
    }

    try {
      const user = await User.findOne({ username: decoded.username });
      if (!user) {
        return res.sendStatus(401);
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.sendStatus(500);
    }
  });
}
