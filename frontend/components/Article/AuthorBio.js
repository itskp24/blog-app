import Image from 'next/image';
import styles from '@/styles/Article/AuthorBio.module.css';

export default function AuthorBio({ author }) {
  return (
    <aside className={styles['author-bio']}>
      <h2 className={styles['author-bio__heading']}>About {author.name}</h2>
      <div className={styles['author-bio__avatar-wrapper']}>
        <Image
          src={author.avatar}
          alt={author.name}
          className={styles['author-bio__avatar']}
          width={72}
          height={72}
        />
      </div>
      <p className={styles['author-bio__text']}>{author.bio}</p>
    </aside>
  );
}
