import connection from "./connection.js";

export async function getTags() {
  try {
    const [rows] = await connection.execute("SELECT * FROM tags;");
    return rows;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
}

export async function postTag(taskId, tagId) {
  try {
    const [result] = await connection.execute(
      "INSERT INTO taskTags (taskId, tagId) VALUES(?,?);",
      [taskId, tagId]
    );
    return result;
  } catch (error) {
    console.error("Error inserting task:", error);
    throw error;
  }
}

export async function putTag(taskId, tagId) {
  try {
    const [result] = await connection.execute(
      "UPDATE taskTags SET taskTags.tagId = ? WHERE taskTags.taskId = ?;",
      [tagId, taskId]
    );

    if (result.affectedRows === 0) {
      return "Task not found";
    }
    return findTagById(tagId);
  } catch (error) {
    console.error("Error updating tag:", error);
    throw error;
  }
}

async function findTagById(id) {
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM tags WHERE tags.id= ?;",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error("Error finding task by id:", error);
  }
}
