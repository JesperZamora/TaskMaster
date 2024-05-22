import { Router } from "express";
import {
  getTasks,
  postTask,
  putTask,
  deleteTask,
} from "../../database/taskRepository.js";
import { authenticateSession } from "../../middleware/userAuthentication.js";
const router = Router();

router.get("/api/v1/tasks", authenticateSession, async (req, res) => {
  const { userId } = req.session;

  try {
    const result = await getTasks(userId);
    return res.status(200).send({ data: result });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).send({ data: "Error fetching tasks" });
  }
});

router.post("/api/v1/tasks", authenticateSession, async (req, res) => {
  const { userId } = req.session;

  try {
    const { title, taskDescription, dueDate } = req.body;
    const result = await postTask(title, taskDescription, dueDate, userId);
    return res.status(200).send({ data: result });
  } catch (error) {
    console.error("Error creating tasks:", error);
    return res.status(500).send({ data: "Error creating task" });
  }
});

router.put("/api/v1/tasks", authenticateSession, async (req, res) => {
  const { id, title, taskDescription } = req.body;

  try {
    const result = await putTask(title, taskDescription, id);
    return res.status(200).send({ data: result });
  } catch (error) {
    console.error("Error updating tasks:", error);
    return res.status(500).send({ data: "Error updating task" });
  }
});

router.delete("/api/v1/tasks", authenticateSession, async (req, res) => {
  const { id } = req.body;

  try {
    const result = await deleteTask(id);
    return res.status(200).send({ data: result });
  } catch (error) {
    console.error("Error deleting tasks:", error);
    return res.status(500).send({ data: "Error deleting task" });
  }
});

export default router;
