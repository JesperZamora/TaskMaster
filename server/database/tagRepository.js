import connection from "./connection.js";

export async function getTags() {
  try {
    const [rows] = await connection.execute("SELECT * FROM tags;");
    return { status: "success", data: rows };
  } catch (error) {
    console.error("Error fetching tags:", error);
    return { status: "error", error: "Error fetching tags" };
  }
}

export async function postTag(taskId, tagId) {
  try {
    const [result] = await connection.execute(
      "INSERT INTO taskTags (taskId, tagId) VALUES(?,?);",
      [taskId, tagId]
    );
    return { status: "success", data: result };
  } catch (error) {
    console.error("Error inserting task:", error);
    return { status: "error", error: "Error inserting task tag" };
  }
}

export async function putTag(taskId, tagId) {
  try {
    const [result] = await connection.execute(
      "UPDATE taskTags SET taskTags.tagId = ? WHERE taskTags.taskId = ?;",
      [tagId, taskId]
    );

    if (result.affectedRows === 0) {
      return { status: "error", error: "Task tag not found" };
    }
    return findTagById(tagId);
  } catch (error) {
    console.error("Error updating tag:", error);
    return { status: "error", error: "Error updating task tag" };
  }
}

async function findTagById(id) {
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM tags WHERE tags.id = ?;",
      [id]
    );
    return { status: "success", data: rows[0] };
  } catch (error) {
    console.error("Error finding task by id:", error);
    return { status: "error", error: "Error finding tag by id" };
  }
}
