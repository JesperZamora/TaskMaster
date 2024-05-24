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

    return tasksWithFormattedDates;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

export async function postTask(
  title,
  taskDescription,
  dueDate,
  isCompleted,
  userId
) {
  try {
    const [result] = await connection.execute(
      "INSERT INTO tasks (title, taskDescription, dueDate, isCompleted, userId) values(?,?,?,?,?);",
      [title, taskDescription, dueDate, isCompleted, userId]
    );
    return {
      id: result.insertId,
      title,
      taskDescription,
      dueDate,
      isCompleted,
    };
  } catch (error) {
    console.error("Error inserting task:", error);
    throw error;
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
      return "Task not found";
    }
    const task = await findTaskById(id);
    return task;
  } catch (error) {
    console.error("Error inserting task:", error);
    throw error;
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
      return "Task not deleted";
    }
    return "Task deleted";
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}

async function findTaskById(id) {
  try {
    const [rows] = await connection.query(
      "SELECT * FROM tasks WHERE tasks.id= ?;",
      [id]
    );

    const tasksFormatted = isCompletedFormatter(rows);
    const tasksWithFormattedDates = dateFormatter(tasksFormatted);

    return tasksWithFormattedDates[0];
  } catch (error) {
    console.error("Error finding task by id:", error);
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
