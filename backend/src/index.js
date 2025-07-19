async function waitForDB() {
  let retries = 30;
  while (retries) {
    try {
      await pool.query('SELECT 1');
      console.log('Database is ready!');
      return;
    } catch (err) {
      retries -= 1;
      console.log(`Database not ready, retrying... (${retries} left)`);
      await new Promise(res => setTimeout(res, 3000));
    }
  }
  throw new Error('Database not reachable after multiple attempts');
}

(async () => {
  await waitForDB();
  await initDB();

  app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
  });
})();
