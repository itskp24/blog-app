require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const fs = require('fs');
const path = require('path');

console.log('DB URL check:', process.env.DATABASE_URL ? 'FOUND' : 'NOT FOUND');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seed...');


  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.author.deleteMany({});
  await prisma.guide.deleteMany({});


  const postsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/posts.json'), 'utf8'));
  const commentsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/comments.json'), 'utf8'));


  const authorsMap = new Map();
  for (const post of postsData) {
    if (post.author && !authorsMap.has(post.author.name)) {
      const author = await prisma.author.create({
        data: {
          name: post.author.name,
          avatar: post.author.avatar,
          bio: post.author.bio,
        },
      });
      authorsMap.set(post.author.name, author.id);
    }
  }
  console.log(`✅ Seeded ${authorsMap.size} authors.`);


  for (const post of postsData) {
    await prisma.post.create({
      data: {
        slug: post.slug,
        title: post.title,
        date: post.date,
        category: post.category,
        excerpt: post.excerpt,
        heroImage: post.heroImage,
        body: post.body,
        blockquote: post.blockquote,
        prevPostSlug: post.prevPost?.slug,
        prevPostTitle: post.prevPost?.title,
        nextPostSlug: post.nextPost?.slug,
        nextPostTitle: post.nextPost?.title,
        authorId: authorsMap.get(post.author.name),
      },
    });
  }
  console.log(`✅ Seeded ${postsData.length} posts.`);


  let commentCount = 0;
  for (const entry of commentsData) {
    for (const comment of entry.comments) {
      await prisma.comment.create({
        data: {
          author: comment.author,
          avatar: comment.avatar,
          rating: comment.rating,
          date: comment.date,
          text: comment.text,
          postSlug: entry.slug,
        },
      });
      commentCount++;
    }
  }
  console.log(`✅ Seeded ${commentCount} comments.`);


  const TOUR_GUIDES = [
    {
      name: 'Miranda Rachel',
      location: 'Jombang, Jawa timur',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces',
      rating: 4,
      score: '(4.0)',
    },
    {
      name: 'Danielle Marsh',
      location: 'Wonosobo, Jawa ten..',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces',
      rating: 4,
      score: '(4.0)',
    },
    {
      name: 'Kang Haerin',
      location: 'Bandung, Jawa barat',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces',
      rating: 5,
      score: '(5.0)',
    },
  ];

  for (const guide of TOUR_GUIDES) {
    await prisma.guide.create({
      data: guide,
    });
  }
  console.log(`✅ Seeded ${TOUR_GUIDES.length} guides.`);

  console.log('✨ Seed finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
