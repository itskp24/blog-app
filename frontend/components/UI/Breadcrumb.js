import Link from 'next/link';
import styles from '@/styles/UI/Breadcrumb.module.css';

export default function Breadcrumb({ title }) {
  return (
    <header className={styles.breadcrumb}>
      <nav className={styles.breadcrumb__nav} aria-label="Breadcrumb">
        <Link href="/" className={styles.breadcrumb__item}>Home</Link>
        <span className={styles.breadcrumb__separator} aria-hidden="true">/</span>
        <Link href="/" className={styles.breadcrumb__item}>Articles</Link>
        <span className={styles.breadcrumb__separator} aria-hidden="true">/</span>
      </nav>
      <h1 className={styles.breadcrumb__title}>{title}</h1>
    </header>
  );
}
