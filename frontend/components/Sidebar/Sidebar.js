'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import api from '@/lib/api';
import styles from '@/styles/Sidebar.module.css';
import { SidebarSkeleton } from '../UI/Skeleton';
import StarRating from '../UI/StarRating';

export default function Sidebar() {
  const router = useRouter();
  const { slug } = router.query;
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSidebarData() {
      try {
        const [postsData, guidesData] = await Promise.all([
          api.fetchRelatedPosts(slug),
          api.fetchGuides(),
        ]);
        setRelatedPosts(postsData);
        setGuides(guidesData);
      } catch (err) {
        console.error('Error loading sidebar data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSidebarData();
  }, [slug]);

  if (loading) {
    return (
      <aside className={styles.sidebar}>
        <SidebarSkeleton />
      </aside>
    );
  }

  return (
    <aside className={styles.sidebar}>
      
      <h2 className={styles.sidebar__heading}>Explore more</h2>
      {relatedPosts.length > 0 ? (
        relatedPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className={styles['explore-card']}>
            <div className={styles['explore-card__image-wrapper']}>
              <Image
                src={post.heroImage}
                alt={post.title}
                className={styles['explore-card__image']}
                width={280}
                height={140}
                unoptimized
              />
            </div>
            <div className={styles['explore-card__meta']}>
              <span className={styles['explore-card__category']}>{post.category}</span>
              <span className={styles['explore-card__date']}>{post.date}</span>
            </div>
            <p className={styles['explore-card__title']}>{post.title}</p>
          </Link>
        ))
      ) : (
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
          No related posts found.
        </p>
      )}
      
      <hr className={styles.sidebar__divider} />

      
      <h2 className={styles.sidebar__heading}>Tour Guides</h2>
      {guides.length > 0 ? (
        guides.map((guide) => (
          <div key={guide.name} className={styles.guide}>
            <Image
              src={guide.avatar}
              alt={guide.name}
              className={styles.guide__avatar}
              width={44}
              height={44}
              unoptimized
            />
            <div className={styles.guide__info}>
              <p className={styles.guide__name}>{guide.name}</p>
              <p className={styles.guide__location}>{guide.location}</p>
              <StarRating rating={guide.rating} score={guide.score} />
            </div>
          </div>
        ))
      ) : (
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-muted)' }}>
          No tour guides available.
        </p>
      )}
    </aside>
  );
}
