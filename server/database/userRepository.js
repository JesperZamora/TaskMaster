import connection from "./connection.js";

export async function createUser(firstName, lastName, email, password) {
  const defaultUser = process.env.DEFAULT_USER || "normal";
  try {
    const result = await connection.execute(
      "INSERT INTO users(firstName, lastName, email, password, user) VALUES(?,?,?,?,?)",
      [firstName, lastName, email, password, defaultUser]
    );
    const id = result[0].insertId;
    const userResult = await getUserById(id);
    if (userResult.status === "success") {
      return { status: "success", data: userResult.data };
    } else {
      return { status: "error", error: userResult.error };
    }
  } catch (error) {
    console.log("Error creating user:", error);
    return { status: "error", error: "Error creating user" };
  }
}

async function getUserById(id) {
  try {
    const [row] = await connection.execute(
      "SELECT firstName, lastName, email FROM users WHERE users.id = ?;",
      [id]
    );
    return { status: "success", data: row[0] };
    
  } catch (error) {
    console.log("Error fetching user by id:", error);
    return { status: "error", error: "Error fetching user by id" };
  }
}

export async function getUserByEmail(email) {
  try {
    const [row] = await connection.execute(
      "SELECT id, email, password FROM users WHERE email = ?;",
      [email]
    );
    return { status: "success", data: row[0] };
  } catch (error) {
    console.log("Error fetching user by email:", error);
    return { status: "error", error: "Error fetching user by email" };
  }
}
