import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Article/RelatedArticles.module.css';

export default function RelatedArticles({ articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className={styles.related}>
      <div className="container">
        <h2 className={styles.related__heading}>Related articles</h2>
        <div className={styles.related__grid}>
          {articles.map((article) => (
            <Link key={article.id} href={`/blog/${article.slug}`} className={styles.card}>
              <div className={styles['card__image-wrapper']}>
                <Image
                  src={article.heroImage}
                  alt={article.title}
                  className={styles.card__image}
                  width={400}
                  height={250}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h3 className={styles.card__title}>{article.title}</h3>
              <p className={styles.card__excerpt}>{article.excerpt}</p>
              <span className={styles.card__footer}>By {article.author.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
