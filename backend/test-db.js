require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function test() {
  console.log('Testing connection to:', process.env.DATABASE_URL);
  try {
    await prisma.$connect();
    console.log('✅ Connected successfully!');
    const postsCount = await prisma.post.count();
    console.log('Posts count:', postsCount);
  } catch (err) {
    console.error('❌ Connection failed:');
    console.dir(err, { depth: null });
  } finally {
    await prisma.$disconnect();
  }
}

test();
