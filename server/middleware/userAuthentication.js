import { verifyPassword } from "../utils/passwordUtils.js";
import { getUserByEmail } from "../database/userRepository.js";

export async function autenticateUser(req, res, next) {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  const isValid = verifyPassword(password, user.password);

  if (!user || !isValid) {
    return res.status(401).send({ data: "Incorrect username or password" });
  }

  req.userId = user.id;
  next();
}

export function authenticateSession(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).send({ data: "Unauthorized" });
  }
  next();
}
