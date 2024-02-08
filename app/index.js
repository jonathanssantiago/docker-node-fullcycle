const express = require('express');
const { db } = require('./model');
const app = express();

const PORT = 3000;

async function initializeApp() {
  try {
    await db.Raw(`
      CREATE TABLE IF NOT EXISTS people (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(50),
        PRIMARY KEY (id)
      )
    `);

    await db.Raw(`
      INSERT INTO people (name) VALUES ('Jonathan'), ('FullCycle'), ('João'), ('Pedro')
    `);

    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

app.get('/', async (_, res) => {
  try {
    const selectSql = `SELECT * FROM people`;
    const people = await db.Raw(selectSql);

    const title = '<h1>Full Cycle Rocks!</h1>';
    const list = `
      <ul>
        ${people.map((p) => `<li>${p.name}</li>`).join('')}
      </ul>
    `;

    res.send(title + list);
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running`);
  initializeApp();
});
