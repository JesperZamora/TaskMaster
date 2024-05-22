import connection from "./connection.js";
import { hashPassword } from "../utils/passwordUtils.js";

export async function createTables() {
  try {
    await connection.query("DROP TABLE IF EXISTS tasks;");
    await connection.query("DROP TABLE IF EXISTS users;");

    await connection.query(`CREATE TABLE Users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(50),
      lastName VARCHAR(50),
      email VARCHAR(100),
      password VARCHAR(100),
      creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user ENUM('normal', 'admin'));`);

    await connection.query(`CREATE TABLE Tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(100),
      taskDescription TEXT,
      creationDate DATE DEFAULT (CURRENT_DATE()),
      dueDate DATE,
      isCompleted BOOLEAN DEFAULT 0,
      userId INT,
      FOREIGN KEY (userId) REFERENCES Users(id)
    );`);

    return "Users- & tasks table created";
  } catch (error) {
    console.log("Error occured creating user table", error);
  }
}

export async function insertUserData() {
  const sql =
    "INSERT INTO users (firstName, lastName, email, password, user) values (?,?,?,?,?);";

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
    "INSERT INTO tasks (title, taskDescription, dueDate, isCompleted, userId) values (?,?,?,?,?);";

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
