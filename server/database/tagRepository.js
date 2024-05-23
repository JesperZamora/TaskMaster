import connection from "./connection.js";

export async function getTags() {
  try {
    const [rows] = await connection.query("SELECT * FROM tags;");
    return rows;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
}

export async function postTag(taskId, tagId) {
  try {
    const [result] = await connection.query("INSERT INTO taskTags (taskId, tagId) VALUES(?,?)",[taskId, tagId]);
    return result;
  } catch (error) {
    console.error("Error inserting task:", error);
    throw error;
  }
}

export async function putTag(taskId, tagId) {
  try {
    const [result] = await connection.query("UPDATE taskTags SET taskTags.tagId = ? WHERE taskTags.taskId = ?",[tagId, taskId]);

    if (result.affectedRows === 0) {
      return "Task not found";
    }
    return result;
  } catch (error) {
    console.error("Error updating tag:", error);
    throw error;
  }
}
