import connection from "./connection.js";
import { hashPassword } from "../utils/passwordUtils.js";

export async function createTables() {
  try {
    await connection.query("DROP TABLE IF EXISTS taskTags");
    await connection.query("DROP TABLE IF EXISTS tags");
    await connection.query("DROP TABLE IF EXISTS tasks;");
    await connection.query("DROP TABLE IF EXISTS users;");

    await connection.query(
      `CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(50),
        lastName VARCHAR(50),
        email VARCHAR(100),
        password VARCHAR(100),
        creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user ENUM('normal', 'admin')
      );`
    );

    await connection.query(
      `CREATE TABLE tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100),
        taskDescription TEXT,
        creationDate DATE DEFAULT (CURRENT_DATE()),
        dueDate DATE,
        days INT,
        isCompleted BOOLEAN DEFAULT 0,
        userId INT,
        FOREIGN KEY (userId) REFERENCES Users(id)
      );`
    );

    await connection.query(
      `CREATE TABLE tags (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(20) UNIQUE NOT NULL
      );`
    );

    await connection.query(
      `CREATE TABLE taskTags (
        taskId INT NOT NULL,
        tagId INT NOT NULL,
        PRIMARY KEY (taskId, tagId),
        FOREIGN KEY (taskId) REFERENCES tasks(id) ON DELETE CASCADE,
        FOREIGN KEY (tagId) REFERENCES tags(id) ON DELETE CASCADE
      );`
    );

    await connection.query(
      `CREATE TRIGGER beforeInsertTask
      BEFORE INSERT ON tasks
      FOR EACH ROW
      BEGIN
          SET NEW.days = DATEDIFF(NEW.dueDate, NEW.creationDate);
      END;`
    );

    await connection.query(
      `CREATE TRIGGER beforeUpdateTask
      BEFORE UPDATE ON tasks
      FOR EACH ROW
      BEGIN
          SET NEW.days = DATEDIFF(NEW.dueDate, NEW.creationDate);
      END;`
    );

    return "Tables created";
  } catch (error) {
    console.error("Error occured creating tables", error);
  }
}

export async function insertUserData() {
  const sql =
    "INSERT INTO users (firstName, lastName, email, password, user) VALUES (?,?,?,?,?);";

  await connection.execute(sql, [
    "Admin",
    "User",
    "admin.user@example.com",
    hashPassword("adminpassword"),
    "admin",
  ]);
  await connection.execute(sql, [
    "John",
    "Doe",
    "john.doe@example.com",
    hashPassword("password123"),
    "normal",
  ]);
  await connection.execute(sql, [
    "Jane",
    "Smith",
    "jane.smith@example.com",
    hashPassword("password456"),
    "normal",
  ]);
}

export async function insertTasksData() {
  const sql =
    "INSERT INTO tasks (title, taskDescription, dueDate, isCompleted, userId) VALUES (?,?,?,?,?);";

  await connection.execute(sql, [
    "Task 1",
    "This is the description of task 1",
    "2024-06-1",
    1,
    2,
  ]);
  await connection.execute(sql, [
    "Task 2",
    "This is the description of task 2",
    "2024-06-2",
    0,
    2,
  ]);
  await connection.execute(sql, [
    "Task 3",
    "This is the description of task 3",
    "2024-06-3",
    0,
    3,
  ]);
  await connection.execute(sql, [
    "Task 4",
    "This is the description of task 4",
    "2024-06-4",
    0,
    3,
  ]);
}

export async function insertTagsData() {
  const sql = "INSERT INTO tags (category) VALUES (?);";
  await connection.execute(sql, ["private"]);
  await connection.execute(sql, ["business"]);
  await connection.execute(sql, ["work"]);
  await connection.execute(sql, ["project"]);
  await connection.execute(sql, ["sport"]);
  await connection.execute(sql, ["fun"]);
  await connection.execute(sql, ["vacation"]);
}

export async function insertTaskTagsData() {
  const sql = "INSERT INTO taskTags (taskId, tagId) VALUES(?,?);";
  await connection.execute(sql, ["1", "4"]);
  await connection.execute(sql, ["2", "6"]);
  await connection.execute(sql, ["3", "3"]);
  await connection.execute(sql, ["4", "2"]);
}
