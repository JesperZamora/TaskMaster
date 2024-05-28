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
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user ENUM('normal', 'admin') NOT NULL
      );`
    );

    await connection.query(
      `CREATE TABLE tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        taskDescription TEXT NOT NULL,
        creationDate DATE DEFAULT (CURRENT_DATE()),
        dueDate DATE NOT NULL,
        days INT,
        isCompleted BOOLEAN DEFAULT 0,
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES Users(id)
      );`
    );

    await connection.query(
      `CREATE TABLE tags (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(20) NOT NULL UNIQUE
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
    "Sports",
    "Join the local soccer league and attend weekly practice sessions every Saturday morning. Improve your skills, meet new teammates, and enjoy the thrill of competitive matches throughout the season.",
    "2024-06-1",
    0,
    2,
  ]);
  await connection.execute(sql, [
    "Fun games",
    "Organize a weekend game night with friends. Select a mix of board games and video games, prepare snacks and drinks, and create a fun, inviting atmosphere for an evening of friendly competition and laughter.",
    "2024-06-2",
    0,
    2,
  ]);
  await connection.execute(sql, [
    "Self improvement",
    "Dedicate time to self-care and personal growth. Set up a daily routine that includes meditation, journaling, and reading. Focus on activities that promote mental well-being and personal reflection.",
    "2024-06-3",
    0,
    3,
  ]);
  await connection.execute(sql, [
    "Vacation",
    "Plan a relaxing beach vacation for the family. Research destinations, book flights and accommodations, and create an itinerary that includes sightseeing, dining, and plenty of downtime by the ocean.",
    "2024-06-4",
    0,
    3,
  ]);
  await connection.execute(sql, [
    "Work stuff",
    "Prepare for the upcoming quarterly review meeting. Compile performance reports, highlight key achievements, and identify areas for improvement. Create a presentation to showcase your progress and future goals.",
    "2024-06-2",
    0,
    2,
  ]);
  await connection.execute(sql, [
    "Start garden club",
    "Start a community garden project. Gather interested neighbors, find a suitable location, plan the layout, and assign tasks. Plant a variety of fruits, vegetables, and flowers to create a vibrant, shared space.",
    "2024-06-2",
    0,
    2,
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
  await connection.execute(sql, ["1", "5"]);
  await connection.execute(sql, ["2", "6"]);
  await connection.execute(sql, ["3", "1"]);
  await connection.execute(sql, ["4", "7"]);
  await connection.execute(sql, ["5", "3"]);
  await connection.execute(sql, ["6", "4"]);
}
