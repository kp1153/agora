 import { initDatabase } from './db.js';

async function setup() {
  try {
    console.log('Database tables बना रहे हैं...');
    await initDatabase();
    console.log('✅ Database tables सफलतापूर्वक बन गए!');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

setup();