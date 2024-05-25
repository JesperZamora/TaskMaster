import { Router } from "express";
import { getTags } from "../../database/tagRepository.js";
import { authenticateSession } from "../../middleware/userAuthentication.js";

const router = Router();

router.get("/api/v1/tags", authenticateSession, async (req, res) => {
  try {
    const result = await getTags();

    if (result.status === "success") {
      return res.status(200).send({ data: result.data });
    } else {
      return res.status(500).send({ data: result.error });
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).send({ data: "Error fetching tags" });
  }
});

export default router;
