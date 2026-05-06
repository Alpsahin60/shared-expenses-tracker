import initSqlJs from 'sql.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let db: any;

const ready: Promise<void> = initSqlJs().then((SQL: any) => {
  db = new SQL.Database();

  db.exec(`
    CREATE TABLE IF NOT EXISTS people (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT
    );
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      amount REAL NOT NULL,
      paid_by INTEGER NOT NULL,
      date TEXT
    );
    CREATE TABLE IF NOT EXISTS expense_participants (
      expense_id INTEGER NOT NULL,
      person_id INTEGER NOT NULL,
      PRIMARY KEY (expense_id, person_id)
    );
  `);

  // Seed demo data
  db.exec(`
    INSERT INTO people (name, email) VALUES ('Alice', 'alice@demo.com');
    INSERT INTO people (name, email) VALUES ('Bob', 'bob@demo.com');
    INSERT INTO people (name, email) VALUES ('Charlie', 'charlie@demo.com');
    INSERT INTO expenses (description, amount, paid_by, date) VALUES ('Dinner', 60.00, 1, '2024-01-15');
    INSERT INTO expenses (description, amount, paid_by, date) VALUES ('Groceries', 45.00, 2, '2024-01-16');
    INSERT INTO expenses (description, amount, paid_by, date) VALUES ('Taxi', 30.00, 3, '2024-01-17');
    INSERT INTO expense_participants (expense_id, person_id) VALUES (1, 1);
    INSERT INTO expense_participants (expense_id, person_id) VALUES (1, 2);
    INSERT INTO expense_participants (expense_id, person_id) VALUES (1, 3);
    INSERT INTO expense_participants (expense_id, person_id) VALUES (2, 1);
    INSERT INTO expense_participants (expense_id, person_id) VALUES (2, 2);
    INSERT INTO expense_participants (expense_id, person_id) VALUES (3, 2);
    INSERT INTO expense_participants (expense_id, person_id) VALUES (3, 3);
  `);
});

export const pool = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: async (sql: string, params?: any[]): Promise<[any, any]> => {
    await ready;
    const upper = sql.trim().toUpperCase();

    if (upper.startsWith('SELECT')) {
      const stmt = db.prepare(sql);
      if (params && params.length > 0) stmt.bind(params);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rows: any[] = [];
      while (stmt.step()) rows.push(stmt.getAsObject());
      stmt.free();
      return [rows, []];
    } else {
      const stmt = db.prepare(sql);
      if (params && params.length > 0) stmt.bind(params);
      stmt.step();
      stmt.free();
      const insertId = (db.exec('SELECT last_insert_rowid()')[0]?.values[0][0]) ?? 0;
      const affectedRows = db.getRowsModified();
      return [{ insertId, affectedRows }, []];
    }
  }
};
