Gen AI Query API

Project Overview:

This project is a lightweight backend service that simulates an AI-powered data query system. It allows users to send natural language queries and get structured responses in a pseudo-SQL format, mimicking AI-driven database interactions.

Features:

Convert natural language queries into pseudo-SQL.

Simulate database responses using an in-memory mock database.

Endpoints for querying, explaining, and validating user queries.

Implements lightweight authentication using API keys.

Includes basic error handling for invalid inputs.

Installation & Setup:

1️⃣ Clone the Repository

git clone https://github.com/srinivas191/gen-ai-query-api.git
cd gen-ai-query-api

2️⃣ Install Dependencies

npm install

3️⃣ Start the Server

Development Mode (Auto-restarts on changes)

npm run dev

Production Mode

npm start

The server runs on http://localhost:3000 by default.

4️⃣ API Authentication

Use name in request headers.

API Key: Srinivas.

 API Endpoints:

1️⃣ Query Endpoint

URL: POST /query

Description: Converts natural language to pseudo-SQL and fetches mock results.

Request:

{
  "query": "Show all employees"
}

Response:

{
  "sqlQuery": "SELECT * FROM employees",
  "result": [ {"id": 1, "name": "John Doe", "age": 30, "role": "Engineer"}, ... ]
}

2️⃣ Explain Query

URL: POST /explain

Description: Returns an explanation of how the query is interpreted.

Response:

{
  "explanation": "Converted natural language query to: SELECT * FROM employees"
}

3️⃣ Validate Query

URL: POST /validate

Description: Checks if the query can be processed.

Response:

{
  "valid": true
}
