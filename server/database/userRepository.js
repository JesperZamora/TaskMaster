import connection from "./connection.js";

export async function createUser(firstName, lastName, email, password) {
  try {
    const result = await connection.query(
      "INSERT INTO users(firstName, lastName, email, password, user) VALUES(?,?,?,?,?)",
      [firstName, lastName, email, password, "normal"]
    );
    const id = result[0].insertId;
    const data = await getUserById(id);
    return data;
  } catch (error) {
    console.log("Error creating user:", error);
    throw error;
  }
}

async function getUserById(id) {
  try {
    const [row] = await connection.query(
      "SELECT firstName, lastName, email FROM users WHERE users.id=?;",
      [id]
    );
    return row[0];
  } catch (error) {
    console.log("Error fetching user by id:", error);
    throw error;
  }
}

export async function getUserByEmail(email) {
  try {
    const [row] = await connection.query(
      "SELECT id, email, password FROM users WHERE email=?;",
      [email]
    );
    return row[0];
  } catch (error) {
    console.log("Error fetching user by email:", error);
    throw error;
  }
}
