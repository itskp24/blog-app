import Image from 'next/image';
import styles from '@/styles/Article/ArticleHero.module.css';

export default function ArticleHero({ heroImage, title }) {
  return (
    <section className={styles.hero}>
      <div className={styles['hero__image-wrapper']}>
        <Image
          src={heroImage}
          alt={title}
          width={1200}
          height={650}
          priority
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </section>
  );
}
