const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true }
    });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error reading posts' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, body, date, category, excerpt, heroImage, author, blockquote, slug } = req.body;

    if (!title || !body || !slug || !author) {
      return res.status(400).json({ message: 'Title, body, slug, and author are required' });
    }

    const authorRecord = await prisma.author.upsert({
      where: { name: author.name },
      update: { avatar: author.avatar, bio: author.bio },
      create: { name: author.name, avatar: author.avatar, bio: author.bio },
    });

    const newPost = await prisma.post.create({
      data: {
        slug,
        title,
        date: date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
        category: category || 'General',
        excerpt: excerpt || (Array.isArray(body) ? body[0] : body.substring(0, 150)),
        heroImage: heroImage || 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1200&h=500&fit=crop&crop=faces',
        body: Array.isArray(body) ? body : [body],
        blockquote: blockquote || '',
        authorId: authorRecord.id,
      },
      include: { author: true }
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post' });
  }
});

router.get('/guides/all', async (req, res) => {
  try {
    const guides = await prisma.guide.findMany();
    res.json(guides);
  } catch (error) {
    console.error('Error fetching guides:', error);
    res.status(500).json({ message: 'Error fetching guides' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: req.params.slug },
      include: { author: true }
    });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Error reading post' });
  }
});

router.get('/:slug/related', async (req, res) => {
  try {
    const related = await prisma.post.findMany({
      where: { 
        slug: { not: req.params.slug } 
      },
      take: 4,
      include: { author: true }
    });
    res.json(related);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    res.status(500).json({ message: 'Error fetching related posts' });
  }
});

module.exports = router;
