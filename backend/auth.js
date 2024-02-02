import jwt from "jsonwebtoken";

export default function authorize(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.sendStatus(401);
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme != "Bearer") {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, _) => {
    if (err) {
      return res.sendStatus(401);
    }

    next();
  });
}
