import { Router } from "express";
import {
  autenticateUser,
  authenticateSession,
} from "../../middleware/userAuthentication.js";
import {
  checkCredentialsSignup,
  checkDuplicateUser,
  checkEmail,
  checkCredentialsLogin,
} from "../../middleware/userValidation.js";
import { createUser } from "../../database/userRepository.js";
import { hashPassword } from "../../utils/passwordUtils.js";

const router = Router();

router.post(
  "/api/v1/signup",
  checkCredentialsSignup,
  checkDuplicateUser,
  checkEmail,
  async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const hashedPassword = hashPassword(password);
      const result = await createUser(
        firstName,
        lastName,
        email,
        hashedPassword
      );
      if (result.status === "success") {
        return res.status(201).send({ data: "Signup Successful" });
      } else {
        return res.status(500).send({ data: result.error });
      }
    } catch (error) {
      console.error("Error in signup:", error);
      return res.status(500).send({ data: "Signup failed" });
    }
  }
);

router.post(
  "/api/v1/login",
  checkCredentialsLogin,
  checkEmail,
  autenticateUser,
  async (req, res) => {
    try {
      req.session.userId = req.userId;
      return res.status(200).send({ data: "Login Successful" });
    } catch (error) {
      console.error("Error in login:", error);
      return res.status(500).send({ data: "Login failed" });
    }
  }
);

router.get("/api/v1/logout", authenticateSession, (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).send({ data: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    return res.status(200).send({ data: "Logged out" });
  });
});

export default router;
