import connection from "./connection.js";

export async function getTasks(userId) {
  try {
    const [rows] = await connection.query(
      "SELECT * FROM tasks WHERE userId = ?;",
      [userId]
    );
    const tasksFormatted = dateFormatter(rows);
    return tasksFormatted;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

export async function postTask(title, taskDescription, dueDate, userId) {
  try {
    const [result] = await connection.query(
      "INSERT INTO tasks(title, taskDescription, dueDate, userId) values(?,?,?,?);",
      [title, taskDescription, dueDate, userId]
    );
    return { id: result.insertId, title, taskDescription, dueDate };
  } catch (error) {
    console.error("Error inserting task:", error);
    throw error;
  }
}

export async function putTask(title, taskDescription, id) {
  try {
    const [result] = await connection.query(
      "UPDATE tasks SET title = ?, taskDescription = ? WHERE tasks.id = ?;",
      [title, taskDescription, id]
    );

    if (result.affectedRows === 0) {
      return "Task not found";
    }
    return { id, title, taskDescription };
  } catch (error) {
    console.error("Error inserting task:", error);
    throw error;
  }
}

export async function deleteTask(id) {
  try {
    await connection.query("DELETE FROM tasks WHERE id = ?;", [id]);
    const [rows] = await connection.query("SELECT * FROM tasks WHERE id = ?;", [
      id,
    ]);

    if (rows.length > 0) {
      return "Task not deleted";
    }
    return "Task deleted";
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}

function dateFormatter(tasks) {
  return tasks.map((task) => ({
    ...task,
    creationDate: task.creationDate.toISOString().substring(0, 10),
    dueDate: task.dueDate.toISOString().substring(0, 10),
  }));
}
