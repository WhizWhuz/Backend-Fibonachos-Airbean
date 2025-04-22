module.exports = (req, res, next) => {
  const userRole = req.user.role;

  if (userRole === "user" || userRole === "barista") {
    return res.status(403).json({ message: "💂‍♂️ You are not allowed here! 💂‍♂️" });
  }

  next();
};
