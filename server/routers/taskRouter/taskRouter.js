import {
  getTasks,
  postTask,
  putTask,
  deleteTask,
} from "../../database/taskRepository.js";
import { postTag, putTag } from "../../database/tagRepository.js";
import { authenticateSession } from "../../middleware/userAuthentication.js";
import { Router } from "express";

const router = Router();

router.get("/api/v1/tasks", authenticateSession, async (req, res) => {
  try {
    const { userId } = req.session;
    const result = await getTasks(userId);

    if (result.status === "success") {
      return res.status(200).send({ data: result.data });
    } else {
      return res.status(500).send({ data: result.error });
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).send({ data: "Error fetching tasks" });
  }
});

router.post("/api/v1/tasks", authenticateSession, async (req, res) => {
  try {
    const { userId } = req.session;
    const { title, taskDescription, dueDate, isCompleted, tagId } = req.body;
    const taskResult = await postTask(
      title,
      taskDescription,
      dueDate,
      isCompleted,
      userId
    );

    if (taskResult.status === "error") {
      return res.status(500).send({ data: taskResult.error });
    }

    const tagResult = await postTag(taskResult.data.id, tagId);
    if (tagResult.status === "error") {
      return res.status(500).send({ data: tagResult.error });
    }

    return res.status(201).send({ data: { ...taskResult.data, tagId: tagId } });
  } catch (error) {
    console.error("Error creating tasks:", error);
    return res.status(500).send({ data: "Error creating task" });
  }
});

router.put("/api/v1/tasks", authenticateSession, async (req, res) => {
  try {
    const { title, taskDescription, dueDate, isCompleted, id, tagId } =
      req.body;

    const taskResult = await putTask(
      title,
      taskDescription,
      dueDate,
      isCompleted,
      id
    );

    if (taskResult.status === "error") {
      return res.status(404).send({ data: taskResult.error });
    }

    const tagResult = await putTag(id, tagId);

    return res.status(200).send({
      data: {
        ...taskResult.data,
        tagId: tagResult.data.id,
        tag: tagResult.data.category,
      },
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).send({ data: "Error updating task" });
  }
});

router.delete("/api/v1/tasks", authenticateSession, async (req, res) => {
  try {
    const { id } = req.body;
    const result = await deleteTask(id);

    if (result.status === "success") {
      return res.status(200).send({ data: result.data });
    } else {
      return res.status(404).send({ data: result.error });
    }
  } catch (error) {
    console.error("Error deleting tasks:", error);
    return res.status(500).send({ data: "Error deleting task" });
  }
});

export default router;
