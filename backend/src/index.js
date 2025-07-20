const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 4000;

const dbUrl = process.env.DATABASE_URL ? process.env.DATABASE_URL.trim() : '';
if (!dbUrl) {
  console.error('❌ ERROR: DATABASE_URL no está definida.');
  process.exit(1);
}

console.log(`Usando DATABASE_URL: ${dbUrl}`);

const pool = new Pool({
  connectionString: dbUrl,
  ssl: false,
});

// Middleware para JSON
app.use(express.json());

// Esperar que la DB esté lista
async function waitForDB() {
  let retries = 30;
  while (retries) {
    try {
      await pool.query('SELECT 1');
      console.log('✅ Database is ready!');
      return;
    } catch (err) {
      retries -= 1;
      console.error(`❌ Database not ready (${err.message}). Retrying... (${retries} left)`);
      await new Promise(res => setTimeout(res, 3000));
    }
  }
  throw new Error('Database not reachable after multiple attempts');
}

// Inicializar DB (crear tabla y notas iniciales si no hay)
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  const { rows } = await pool.query('SELECT COUNT(*) FROM notes;');
  if (parseInt(rows[0].count, 10) === 0) {
    await pool.query(`
      INSERT INTO notes (title, content)
      VALUES
        ('Bienvenido', 'Esta es tu primera nota.'),
        ('Instrucciones', 'Pulsa el botón + para añadir una nota.');
    `);
    console.log('📥 Notas de ejemplo insertadas.');
  }
}

// --- Rutas API ---

// Listar todas las notas
app.get('/notes', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM notes ORDER BY created_at DESC;');
  res.json(rows);
});

// Crear nota nueva
app.post('/notes', async (req, res) => {
  const { title, content } = req.body;
  const result = await pool.query(
    'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *;',
    [title, content]
  );
  res.json(result.rows[0]);
});

// Actualizar nota
app.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const result = await pool.query(
    'UPDATE notes SET title=$1, content=$2 WHERE id=$3 RETURNING *;',
    [title, content, id]
  );
  if (result.rows.length === 0) return res.status(404).json({ error: 'Nota no encontrada' });
  res.json(result.rows[0]);
});

// Eliminar nota
app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM notes WHERE id=$1;', [id]);
  res.json({ success: true });
});

// Arranque del servidor
(async () => {
  try {
    await waitForDB();
    await initDB();

    app.listen(PORT, () => {
      console.log(`🚀 Backend corriendo en puerto ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Backend no pudo iniciar:', err);
    process.exit(1);
  }
})();
