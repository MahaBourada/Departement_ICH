import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({
      message: "Non authentifié",
    });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({
        message: "Non autorisé",
        error: err.message,
      });
    req.user = decoded.UserInfo;
    next();
  });
};
