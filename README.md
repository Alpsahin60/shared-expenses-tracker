# Shared Expenses Tracker

A full-stack web application for tracking and splitting shared expenses among a group — built with **React**, **TypeScript**, **Express** and **MySQL**.

## Features

- Add people / participants to a group
- Log shared expenses and assign them to a payer
- Automatic calculation of who owes whom
- Summary view showing net balances per person
- REST API backend with full CRUD support
- Persistent data storage via MySQL

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite |
| Backend | Express.js, TypeScript, ts-node |
| Database | MySQL (mysql2) |
| HTTP Client | Fetch API |
| CORS | cors middleware |

## Project Structure

```
shared-expenses-tracker/
├── frontend/
│   ├── src/
│   │   ├── App.tsx                  # Root component & routing
│   │   ├── components/
│   │   │   ├── AddPersonForm.tsx     # Add a new participant
│   │   │   ├── PeopleList.tsx        # Display all participants
│   │   │   ├── AddParticipantForm.tsx
│   │   │   ├── AddExpenseForm.tsx    # Log a new expense
│   │   │   ├── ExpensesList.tsx      # List all expenses
│   │   │   └── SummaryView.tsx       # Net balance calculations
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── backend/
    ├── src/
    │   └── app.ts                   # Express server & API routes
    ├── package.json
    └── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js ≥ 18
- MySQL database

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=expenses_db
```

Start the backend:

```bash
npm run dev
# API running at http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
# App running at http://localhost:5173
```

### Database Setup

```sql
CREATE TABLE people (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  paid_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (paid_by) REFERENCES people(id)
);

CREATE TABLE expense_participants (
  expense_id INT,
  person_id INT,
  PRIMARY KEY (expense_id, person_id),
  FOREIGN KEY (expense_id) REFERENCES expenses(id),
  FOREIGN KEY (person_id) REFERENCES people(id)
);
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/people` | Get all participants |
| POST | `/api/people` | Add a participant |
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Add an expense |
| GET | `/api/summary` | Get net balances |

## Learning Outcomes

- Full-stack application architecture (React + Express)
- RESTful API design with TypeScript
- State management across multiple React components
- MySQL relational data modelling
- CORS configuration for local development

## License

MIT
