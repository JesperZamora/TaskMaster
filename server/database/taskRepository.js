import connection from "./connection.js";

export async function getTasks(userId) {
  try {
    const [rows] = await connection.execute(
      `SELECT tasks.id, tasks.title, tasks.taskDescription, 
      tasks.creationDate, tasks.dueDate, tasks.days, tasks.isCompleted, 
      tags.id as tagId, tags.category as tag FROM tasks 
      JOIN taskTags ON tasks.id = taskTags.taskId 
      JOIN tags ON taskTags.tagId = tags.id 
      WHERE tasks.userId = ?;`,
      [userId]
    );

    const tasksFormatted = isCompletedFormatter(rows);
    const tasksWithFormattedDates = dateFormatter(tasksFormatted);

    return { status: "success", data: tasksWithFormattedDates };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return { status: "error", error: "Error fetching tasks" };
  }
}

export async function postTask(title, taskDescription, dueDate, userId) {
  try {
    const [result] = await connection.execute(
      "INSERT INTO tasks (title, taskDescription, dueDate, userId) values(?,?,?,?);",
      [title, taskDescription, dueDate, userId]
    );
    console.log({
      title,
      taskDescription,
      dueDate,
      userId,
    });

    if (result.affectedRows === 0) {
      return { status: "error", error: "Task not found" };
    }
    const id = result.insertId;
    const task = await findTaskById(id);
    return { status: "success", data: task.data };
  } catch (error) {
    console.error("Error inserting task:", error);
    return { status: "error", error: "Error inserting task" };
  }
}

export async function putTask(
  title,
  taskDescription,
  dueDate,
  isCompleted,
  id
) {
  try {
    const [result] = await connection.execute(
      "UPDATE tasks SET title = ?, taskDescription = ?, dueDate = ?, isCompleted = ? WHERE tasks.id = ?;",
      [title, taskDescription, dueDate, isCompleted, id]
    );

    if (result.affectedRows === 0) {
      return { status: "error", error: "Task not found" };
    }
    const task = await findTaskById(id);
    return { status: "success", data: task.data };
  } catch (error) {
    console.error("Error updating task:", error);
    return { status: "error", error: "Error updating task" };
  }
}

export async function deleteTask(id) {
  try {
    await connection.execute("DELETE FROM tasks WHERE id = ?;", [id]);
    const [rows] = await connection.execute(
      "SELECT * FROM tasks WHERE tasks.id = ?;",
      [id]
    );

    if (rows.length > 0) {
      return { status: "error", error: "Task not deleted" };
    }
    return { status: "success", data: "Task deleted" };
  } catch (error) {
    console.error("Error deleting task:", error);
    return { status: "error", error: "Error deleting task" };
  }
}

async function findTaskById(id) {
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM tasks WHERE tasks.id = ?;",
      [id]
    );

    const tasksFormatted = isCompletedFormatter(rows);
    const tasksWithFormattedDates = dateFormatter(tasksFormatted);

    return { status: "success", data: tasksWithFormattedDates[0] };
  } catch (error) {
    console.error("Error finding task by id:", error);
    return { status: "error", error: "Error finding task by id" };
  }
}

function isCompletedFormatter(tasks) {
  return tasks.map((task) => ({
    ...task,
    isCompleted: Boolean(task.isCompleted),
  }));
}

function dateFormatter(tasks) {
  return tasks.map((task) => ({
    ...task,
    creationDate: task.creationDate.toISOString().substring(0, 10),
    dueDate: task.dueDate.toISOString().substring(0, 10),
  }));
}
