import Link from 'next/link';
import styles from '@/styles/UI/PrevNextNav.module.css';

export default function PrevNextNav({ prevPost, nextPost }) {
  return (
    <nav className={styles.prevnext} aria-label="Post navigation">
      {prevPost ? (
        <Link href={`/blog/${prevPost.slug}`} className={`${styles['prevnext__item']} ${styles['prevnext__item--prev']}`}>
          <span className={`${styles.prevnext__label} ${styles['prevnext__label--prev']}`}>Previous</span>
          <span className={styles.prevnext__title}>{prevPost.title}</span>
        </Link>
      ) : (
        <div className={`${styles['prevnext__item']} ${styles['prevnext__item--prev']}`} />
      )}

      {nextPost ? (
        <Link href={`/blog/${nextPost.slug}`} className={`${styles['prevnext__item']} ${styles['prevnext__item--next']}`}>
          <span className={`${styles.prevnext__label} ${styles['prevnext__label--next']}`}>Next</span>
          <span className={styles.prevnext__title}>{nextPost.title}</span>
        </Link>
      ) : (
        <div className={`${styles['prevnext__item']} ${styles['prevnext__item--next']}`} />
      )}
    </nav>
  );
}
