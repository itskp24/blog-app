const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

router.get('/:slug/comments', async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { postSlug: req.params.slug },
      orderBy: { date: 'desc' },
    });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

const PROFESSIONAL_AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?w=150&h=150&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces'
];

router.post('/:slug/comments', async (req, res) => {
  const { author, text, rating } = req.body;
  if (!author || !text) {
    return res.status(400).json({ error: 'Author and text are required' });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { slug: req.params.slug }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const randomAvatar = PROFESSIONAL_AVATARS[Math.floor(Math.random() * PROFESSIONAL_AVATARS.length)];

    const newComment = await prisma.comment.create({
      data: {
        author,
        text,
        rating: rating || 5,
        avatar: randomAvatar,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        postSlug: req.params.slug,
      },
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Error creating comment' });
  }
});

module.exports = router;
