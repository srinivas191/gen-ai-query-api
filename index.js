const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Mock database (in-memory storage)
const mockDatabase = [
  { id: 1, name:  "Srinivas", age: 21, role: "Intern" },
  { id: 2, name: "Rahul", age: 25, role: "Designer" },
  { id: 3, name: "Vamsi", age: 35, role: "Manager" },
];

// Simple authentication middleware
const authenticate = (req, res, next) => {
  const apiKey = req.headers["name"];
  if (!apiKey || apiKey !== "Srinivas") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

// Convert natural language query to pseudo-SQL
const convertToSQL = (query) => {
  if (query.toLowerCase().includes("all employees")) {
    return "SELECT * FROM employees";
  } else if (query.toLowerCase().includes("age over 30")) {
    return "SELECT * FROM employees WHERE age > 30";
  } else {
    return "QUERY NOT RECOGNIZED";
  }
};

// Simulate AI-powered data query processing
app.post("/query", authenticate, (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }
  const sqlQuery = convertToSQL(query);
  let result = [];
  if (sqlQuery === "SELECT * FROM employees") {
    result = mockDatabase;
  } else if (sqlQuery === "SELECT * FROM employees WHERE age > 30") {
    result = mockDatabase.filter((emp) => emp.age > 30);
  }
  res.json({ sqlQuery, result });
});

// Explain query breakdown
app.post("/explain", authenticate, (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }
  const sqlQuery = convertToSQL(query);
  res.json({ explanation: `Converted natural language query to: ${sqlQuery}` });
});

// Validate query feasibility
app.post("/validate", authenticate, (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }
  const sqlQuery = convertToSQL(query);
  res.json({ valid: sqlQuery !== "QUERY NOT RECOGNIZED" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
