import { getUserByEmail } from "../database/userRepository.js";

export function checkCredentialsSignup(req, res, next) {
  req.body.firstName = req?.body.firstName.trim();
  req.body.lastName = req?.body.lastName.trim();
  req.body.email = req?.body.email.trim();
  req.body.password = req?.body.password.trim();

  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send({ data: "Empty crendential field(s)" });
  }
  next();
}

export function checkCredentialsLogin(req, res, next) {
  req.body.email = req?.body.email.trim();
  req.body.password = req?.body.password.trim();

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ data: "Empty crendential field(s)" });
  }
  next();
}

export async function checkDuplicateUser(req, res, next) {
  const { email } = req.body;
  const exists = await getUserByEmail(email);

  if (exists) {
    return res.status(409).send({ data: "Invalid email" });
  }
  next();
}

export function checkEmail(req, res, next) {
  const email = req?.body.email;

  if (!email.includes("@") || !email.includes(".")) {
    return res.status(400).send({ data: "Email must contain '@' and '.'" });
  }
  next();
}
