export async function onRequestGet(context) {
  const { env } = context;

  try {
    await env.DB.exec(`
      CREATE TABLE IF NOT EXISTS visitors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await env.DB.prepare(`INSERT INTO visitors (name) VALUES ('Test User')`).run();

    const { results } = await env.DB.prepare(`SELECT * FROM visitors`).all();

    return new Response(JSON.stringify({ 
      success: true, 
      data: results 
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}