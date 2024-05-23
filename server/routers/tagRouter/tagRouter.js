import { Router } from "express";
import { getTags } from "../../database/tagRepository.js";

const router = Router();

router.get("/api/v1/tags", async (req, res) => {
  try {
    const result = await getTags();
    res.status(200).send({ data: result });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).send({ data: "Error fetching tags" });
  }
});

export default router;