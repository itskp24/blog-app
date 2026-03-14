import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';
import styles from '@/styles/HomePage.module.css';
import Navbar from '@/components/Layout/Navbar';
import { HomePageSkeleton } from '@/components/UI/Skeleton';
import { useState, useEffect } from 'react';

export async function getStaticProps() {
  try {
    const posts = await api.fetchPosts();
    return {
      props: {
        posts: posts || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching posts for homepage:', error);
    return {
      props: {
        posts: [],
      },
      revalidate: 60,
    };
  }
}

export default function HomePage({ posts }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>{`BLOG — Elite Fitness & Lifestyle Journal`}</title>
        <meta name="description" content="Master your movement, elevate your nutrition, and explore the world. BLOG provides expert-led insights for a high-performance lifestyle." />
        <meta property="og:title" content="BLOG — Elite Fitness & Lifestyle Journal" />
        <meta property="og:description" content="Expert-led insights for a high-performance lifestyle. Master your movement, elevate your nutrition, and explore the world." />
        <meta property="og:image" content="/logo.png" />
      </Head>

      <Navbar />

      <div className={styles.page}>
        <header className={styles.hero}>
          <div className={`container ${styles.hero__inner}`}>
            <p className={styles.hero__label}>Welcome to the Blog</p>
            <h1 className={styles.hero__title}>Fitness, Nutrition &amp; Lifestyle</h1>
            <p className={styles.hero__subtitle}>
              Expert articles to help you live stronger, eat smarter, and explore further.
            </p>
          </div>
        </header>

        <main className="container">
          <section className={styles.section}>
            <h2 className={styles.section__heading}>Latest Articles</h2>

            {isLoading ? (
              <HomePageSkeleton />
            ) : posts.length === 0 ? (
              <p className={styles.empty}>
                No posts available right now. Make sure the backend is running on{' '}
                <code>http://localhost:5000</code>.
              </p>
            ) : (
              <>
                <div className={styles.grid}>
                  {posts.map((post) => (
                    <article key={post.id} className={styles.card}>
                      <Link href={`/blog/${post.slug}`} className={styles.card__image_link}>
                        <div className={styles.card__image_wrapper}>
                          <Image
                            src={post.heroImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className={styles.card__image}
                          />
                          {post.category && (
                            <span className={styles.card__category}>{post.category}</span>
                          )}
                        </div>
                      </Link>

                      <div className={styles.card__body}>
                        <Link href={`/blog/${post.slug}`}>
                          <h2 className={styles.card__title}>{post.title}</h2>
                        </Link>

                        {post.excerpt && (
                          <p className={styles.card__excerpt}>{post.excerpt}</p>
                        )}

                        <div className={styles.card__footer}>
                          <div className={styles.card__author}>
                            {post.author?.avatar && (
                              <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                width={32}
                                height={32}
                                className={styles.card__avatar}
                              />
                            )}
                            <span className={styles.card__author_name}>{post.author?.name}</span>
                          </div>
                          <time className={styles.card__date}>{post.date}</time>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </section>
        </main>

        <footer className={styles.footer}>
          <div className="container">
            <p>© {new Date().getFullYear()} BLOG. All rights reserved. </p>
          </div>
        </footer>
      </div>
    </>
  );
}
